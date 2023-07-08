'use client'

import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';
import {Duration} from 'luxon';
import type {GameEvent, GameInfo, GameStateEvent} from './page';

// Components
import Chat, {ChatMessage} from '../Chat';
import GameHeader from '../GameHeader';
import GameStateIndicator from '../GameStateIndicator';


export type UpdateGameStatesCallbacks<T> = {
    setGameStates: Dispatch<SetStateAction<T[]>>,
    setGameStateIndex: Dispatch<SetStateAction<number>>
}
type GameProps<T> = {
    id: string,
    info: GameInfo,
    defaultBoard: T,
    updateGameStatesFromMoves: (moves: string[], callbacks: UpdateGameStatesCallbacks<T>) => void,
    children: (gameStates: T[], gameStateIndex: number) => ReactNode
}
export default function Game<T>(props: GameProps<T>) {
    const [gameStates, setGameStates] = useState([props.defaultBoard]);
    const [moves, setMoves] = useState<string[]>([]); // TODO: derived state?
    const [gameStateIndex, setGameStateIndex] = useState(0);

    const [ftime, setFtime] = useState(Duration.fromObject({minutes: 3, seconds: 23, milliseconds: 200}));
    const [stime, setStime] = useState(Duration.fromObject({minutes: 1, seconds: 20, milliseconds: 200}));

    const [chat, setChat] = useState<ChatMessage[]>([]);

    // Update the active timer on client-side on a 100ms interval
    useEffect(() => {
        const intervalID = setInterval(() => {
            const setActiveTime = gameStates.length % 2 !== 0 ? setFtime : setStime;

            setActiveTime((time) => {
                const decremented = time.minus(100).normalize();
                return decremented.toMillis() > 0 ? decremented : Duration.fromMillis(0)
            });
        }, 100)

        return () => clearInterval(intervalID);
    }, [gameStates])

    // Subscribe to game event stream on mount and update states on messages
    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/game/${props.id}/events`);

        eventSource.onmessage = (m) => {
            const event: GameEvent = JSON.parse(m.data);
            console.log(event)
            switch (event.type) {
                case 'CHAT_MESSAGE': setChat((chat) => [...chat, event]); break;
                case 'GAME_STATE': handleGameState(event); break;
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
        setStime(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: event.ftime}).normalize());

        setMoves((moves) => moves.concat(event.moves));
        props.updateGameStatesFromMoves(event.moves, {setGameStates, setGameStateIndex});
        // ...
    }

    return (
        <>
            <div className="flex flex-col gap-5 w-[21rem]">
                <GameHeader info={props.info} />
                <Chat id={props.id} chat={chat} />
            </div>

            {props.children(gameStates, gameStateIndex)}

            <GameStateIndicator
                ftime={ftime}
                stime={stime}
                moves={moves}
                index={gameStateIndex}
                setIndex={setGameStateIndex}
                {...props.info}
            />
        </>
    )
}
