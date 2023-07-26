'use client'

import {Dispatch, ReactNode, SetStateAction, startTransition, useEffect, useState} from 'react';
import {Duration} from 'luxon';

// Components
import Chat, {ChatMessage} from '../Chat';
import GameHeader from '../GameHeader';
import GameStateIndicator from '../GameStateIndicator';

// Util
import {revalidate} from '../../../util/actions';
import type {GameEvent, GameInfo, GameStateEvent, Status, WinType} from './page';
import type {Side} from '../../../util/game';


export type UpdateGameStatesCallbacks<T> = {
    setGameStates: Dispatch<SetStateAction<T[]>>,
    setGameStateIndex: Dispatch<SetStateAction<number>>
}
type GameProps<T> = {
    id: string,
    info: GameInfo,
    username?: string,
    defaultBoard: T,
    updateGameStatesFromMoves: (moves: string[], callbacks: UpdateGameStatesCallbacks<T>) => void,
    children: (gameStates: T[], gameStateIndex: number, gameStatus: Status, side: PlayerSide) => ReactNode
}
export default function Game<T>(props: GameProps<T>) {
    const [gameStates, setGameStates] = useState([props.defaultBoard]);
    const [moves, setMoves] = useState<string[]>([]); // TODO: derived state?
    const [gameStateIndex, setGameStateIndex] = useState(0);

    const [gameStatus, setGameStatus] = useState<Status>('WAITING');
    const [winType, setWinType] = useState<WinType | null>(null);

    const [ftime, setFtime] = useState(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: props.info.timeControl.initial}).normalize());
    const [stime, setStime] = useState(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: props.info.timeControl.initial}).normalize());

    const [chat, setChat] = useState<ChatMessage[]>([]);

    const side = getSide(props.username, props.info);

    // Update the active timer on client-side on a 100ms interval
    useEffect(() => {
        // Don't start the timer until the 3rd move, or if the game is over
        if (gameStates.length <= 3) return;
        if (gameStatus !== 'STARTED') return;

        const intervalID = setInterval(() => {
            const setActiveTime = gameStates.length % 2 !== 0 ? setFtime : setStime;

            setActiveTime((time) => {
                const decremented = time.minus(100).normalize();
                return decremented.toMillis() > 0 ? decremented : Duration.fromMillis(0)
            });
        }, 100)

        return () => clearInterval(intervalID);
    }, [gameStates, gameStatus])

    // Subscribe to game event stream on mount and update states on messages
    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/game/${props.id}/events`);

        eventSource.onmessage = (m) => {
            const event: GameEvent = JSON.parse(m.data);
            console.log(event)
            switch (event.type) {
                case 'CHAT_MESSAGE': setChat((chat) => [...chat, event]); break;
                case 'GAME_STATE':
                    handleGameState(event);
                    if (event.winType) startTransition(() => {
                        // TODO: incredibly hacky; backend revalidate on demand?
                        void revalidate(`user-${props.info.first.username}`);
                        void revalidate(`user-${props.info.second.username}`);
                    })

                    // If the game just ended, play the game end sound.
                    if (event.status === 'FIRST_WON' || event.status === 'SECOND_WON')
                        void new Audio('/sound/GenericNotify.mp3').play();
                    break;
                case 'GAME_FULL':
                    setChat(event.chat);
                    handleGameState(event.state);
                    break;
            }
        }

        return () => eventSource.close();
    }, [])

    // Handles a game state event by updating the times and board states.
    function handleGameState(event: Omit<GameStateEvent, 'type'>) {
        setFtime(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: event.ftime}).normalize());
        setStime(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: event.stime}).normalize());

        setGameStatus(event.status);
        setWinType(event.winType);

        setMoves((moves) => moves.concat(event.moves));
        props.updateGameStatesFromMoves(event.moves, {setGameStates, setGameStateIndex});
    }

    return (
        <>
            <div className="flex flex-col gap-5 w-[21rem]">
                <GameHeader info={props.info} />
                <Chat id={props.id} info={props.info} username={props.username} chat={chat} />
            </div>

            {props.children(gameStates, gameStateIndex, gameStatus, side)}

            <GameStateIndicator
                id={props.id}
                ftime={ftime}
                stime={stime}
                status={gameStatus}
                type={winType}
                info={props.info}
                moves={moves}
                index={gameStateIndex}
                setIndex={setGameStateIndex}
            />
        </>
    )
}

export type PlayerSide = Exclude<Side, 'RANDOM'> | 'SPECTATOR'
function getSide(username: string | undefined, info: GameInfo): PlayerSide {
    if (username === info.first.username) return 'FIRST';
    if (username === info.second.username) return 'SECOND';
    return 'SPECTATOR'
}
