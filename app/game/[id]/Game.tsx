'use client'

import {Dispatch, ReactElement, SetStateAction, startTransition, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Duration} from 'luxon';
import GameContext from '../../../contexts/GameContext';

// Components
import Chat, {ChatData} from '../Chat';
import GameHeader from '../GameHeader';
import GameStateIndicator from '../GameStateIndicator';
import ScaledBox from '../../../components/ScaledBox';

// Util
import {revalidate} from '../../../util/actions';
import type {GameEvent, GameInfo, GameStateEvent, Status, EndType, Offer} from './page';
import type {Side} from '../../../util/game';


export type UpdateGameStatesCallbacks<T> = {
    setGameStates: Dispatch<SetStateAction<T[]>>,
    setGameStateIndex: Dispatch<SetStateAction<number>>,
    reset?: boolean
}
type GameProps<T> = {
    id: string,
    info: GameInfo,
    username?: string,
    defaultBoard: T,
    updateGameStatesFromMoves: (moves: string[], callbacks: UpdateGameStatesCallbacks<T>) => void,
    children: (gameStates: T[], gameStateIndex: number, gameStatus: Status, side: PlayerSide) => ReactElement
}
export default function Game<T>(props: GameProps<T>) {
    const [gameStates, setGameStates] = useState([props.defaultBoard]);
    const [moves, setMoves] = useState<string[]>([]); // TODO: derived state?
    const [gameStateIndex, setGameStateIndex] = useState(0);

    const [gameStatus, setGameStatus] = useState<Status>('WAITING');
    const [drawOffer, setDrawOffer] = useState<Offer>('NONE');
    const [rematchOffer, setRematchOffer] = useState<Offer>('NONE');
    const [endType, setEndType] = useState<EndType | null>(null);

    const [ftime, setFtime] = useState(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: props.info.timeControl.initial}).normalize());
    const [stime, setStime] = useState(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: props.info.timeControl.initial}).normalize());

    const [fratingDiff, setFratingDiff] = useState(0);
    const [sratingDiff, setSratingDiff] = useState(0);

    const [chat, setChat] = useState<ChatData[]>([]);

    const {push} = useRouter();

    const side = getSide(props.username, props.info);

    // Update the game state index, playing the move sound if the index was incremented.
    // TODO: hacky?
    function updateGameStateIndex(arg: number | ((old: number) => number)) {
        setGameStateIndex((index) => {
            const newIndex = typeof arg === 'number' ? arg : arg(index);
            if (newIndex > index) void new Audio('/sound/Move.mp3').play();
            return newIndex;
        })
    }

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
                case 'CHAT_ALERT':
                case 'CHAT_MESSAGE':
                    setChat((chat) => [...chat, event]);
                    break;
                case 'GAME_STATE':
                    handleGameState(event);
                    if (event.endType) startTransition(() => {
                        // TODO: incredibly hacky; backend revalidate on demand?
                        void revalidate(`user-${props.info.first.username}`);
                        void revalidate(`user-${props.info.second.username}`);
                    })

                    // If the game just ended, play the game end sound.
                    if (event.status === 'FIRST_WON' || event.status === 'SECOND_WON' || event.status === 'DRAW')
                        void new Audio('/sound/GenericNotify.mp3').play();
                    break;
                case 'GAME_FULL':
                    setChat(event.chat);
                    handleGameState(event.state, true);
                    break;
                case 'REMATCH':
                    setRematchOffer(event.rematchOffer);
                    if (event.id) push(`/game/${event.id}`);
                    break;
            }
        }

        return () => eventSource.close();
    }, [])

    // Handles a game state event by updating the times and board states.
    // TODO: better way to reset states on game full than explicit boolean?
    // TODO: abstract `[defaultBoard]` to this level?
    function handleGameState(event: Omit<GameStateEvent, 'type'>, reset?: boolean) {
        setFtime(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: event.ftime}).normalize());
        setStime(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: event.stime}).normalize());

        setGameStatus(event.status);
        setDrawOffer(event.drawOffer);
        setEndType(event.endType);

        props.updateGameStatesFromMoves(event.moves, {setGameStates, setGameStateIndex: updateGameStateIndex, reset});
        setMoves((moves) => {
            const newMoves = moves.concat(event.moves);

            // Dynamically update tab title if playing the game
            // TODO: blink favicon as well?
            if (side !== 'SPECTATOR') {
                const opponent = side === 'FIRST' ? props.info.second.username : props.info.first.username;
                const yourMove = (side === 'FIRST' && newMoves.length % 2 === 0) || (side === 'SECOND' && newMoves.length % 2 === 1);
                const isOver = event.status !== 'WAITING' && event.status !== 'STARTED';

                document.title = `${isOver ? 'Game over' : yourMove ? 'Your move' : 'Waiting for opponent'} - Play ${opponent} | gulpin.games`;
            }
            return newMoves;
        });

        setFratingDiff(event.fratingDiff);
        setSratingDiff(event.sratingDiff);
    }

    // Handles scrolling within the game board by preventing page scrolling and changing the game state index instead.
    function handleScrollWithin(e: WheelEvent) {
        e.preventDefault();
        setGameStateIndex(e.deltaY > 0
            ? Math.max(gameStateIndex - 1, 1)
            : Math.min(gameStateIndex + 1, moves.length));
    }

    return (
        <GameContext.Provider value={{info: props.info, id: props.id, username: props.username, side, gameStatus, drawOffer, rematchOffer, endType, chat, moves, gameStateIndex, setGameStateIndex: updateGameStateIndex, ftime, stime, fratingDiff, sratingDiff}}>
            <div className="flex flex-col md:flex-row-reverse xl:flex-col w-full gap-5 xl:w-80 flex-none">
                <GameHeader />
                <Chat />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-x-8 gap-y-4 min-w-0 w-full">
                <ScaledBox onWheel={handleScrollWithin}>
                    {props.children(gameStates, gameStateIndex, gameStatus, side)}
                </ScaledBox>

                <GameStateIndicator />
            </div>
        </GameContext.Provider>
    )
}

export type PlayerSide = Exclude<Side, 'RANDOM'> | 'SPECTATOR'
function getSide(username: string | undefined, info: GameInfo): PlayerSide {
    if (username === info.first.username) return 'FIRST';
    if (username === info.second.username) return 'SECOND';
    return 'SPECTATOR'
}
