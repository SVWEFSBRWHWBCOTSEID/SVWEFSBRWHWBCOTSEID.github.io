'use client'

import {useEffect, useState} from 'react';
import {Duration} from 'luxon';
import type {GameEvent, GameFullEvent, GameStateEvent} from './page';

// Components
import Chat, {ChatMessage} from '../../Chat';
import GameHeader, {GameInfo} from '../../GameHeader';
import GameStateIndicator from '../../GameStateIndicator';
import TicTacToeBoard, {BoardStatus, defaultTTTBoard, TTTBoard, TTTSymbol} from './TicTacToeBoard';


export default function TicTacToeGame(props: {id: string}) {
    const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');

    const [gameStates, setGameStates] = useState([defaultTTTBoard]);
    const [moves, setMoves] = useState<string[]>([]); // TODO: derived state?
    const [gameStateIndex, setGameStateIndex] = useState(0);

    const [ftime, setFtime] = useState(Duration.fromObject({minutes: 3, seconds: 23, milliseconds: 200}));
    const [stime, setStime] = useState(Duration.fromObject({minutes: 1, seconds: 20, milliseconds: 200}));

    const [chat, setChat] = useState<ChatMessage[]>([]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            const setActiveTime = playerSymbol === '✕' ? setFtime : setStime;

            setActiveTime((time) => {
                const decremented = time.minus(100).normalize();
                return decremented.toMillis() > 0 ? decremented : Duration.fromMillis(0)
            });
        }, 100)

        return () => clearInterval(intervalID);
    }, [playerSymbol])

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/game/${props.id}/events`);
        eventSource.onmessage = (m) => {
            const event: GameEvent = JSON.parse(m.data);
            switch (event.type) {
                case 'CHAT_MESSAGE': setChat([...chat, event]); break;
                case 'GAME_STATE': handleGameState(event); break;
                case 'GAME_FULL':
                    setGameInfo(event); // TODO: possibly hacky?
                    setChat(event.chat);
                    handleGameState(event.state);
                    break;
            }
        }
    }, [])

    // Handles a game state event by updating the times and board states.
    function handleGameState(event: Omit<GameStateEvent, 'type'>) {
        setFtime(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: event.ftime}).normalize());
        setStime(Duration.fromObject({minutes: 0, seconds: 0, milliseconds: event.ftime}).normalize());
        setMoves(event.moves);
        updateGameStatesFromMoves(event.moves);
        // ...
    }

    function updateGameStatesFromMoves(moves: string[]) {
        const arr = gameStates.slice();
        let symbol = playerSymbol;

        for (let i = 0; i < moves.length; i++) {
            const [, col, row] = moves[i].match(/(\w)(\d)/)!;
            const state = arr.at(-1)!.slice() as TTTBoard;

            state[rowToIndex(row) + colToIndex(col)] = symbol;
            arr.push(state);

            symbol = symbol === '✕' ? '✕' : '◯'
        }

        setGameStates(arr);
    }

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    async function setSquare(square: number) {
        const col = square % 3;
        const row = (square - col) / 3

        await fetch(`${process.env.API_BASE}/game/${props.id}/move/${indexToCol(col)}${row}`, {
            method: 'POST',
            credentials: 'include'
        });
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
    }

    if (!gameInfo) return null; // TODO: loading UI

    return (
        <>
            <div className="flex flex-col gap-5 w-[21rem]">
                <GameHeader game="ttt" {...gameInfo} />
                <Chat chat={chat} />
            </div>

            <TicTacToeBoard
                boardState={gameStates.at(-1)!}
                playerSymbol={playerSymbol}
                setSquare={setSquare}
                setBoardStatus={setGameStatus}
                disabled={gameStatus !== BoardStatus.PLAYING}
            />

            <GameStateIndicator
                ftime={ftime}
                stime={stime}
                moves={moves}
                index={gameStateIndex}
                setIndex={setGameStateIndex}
                {...gameInfo}
            />
        </>
    )
}

function rowToIndex(row: string) {
    return (Number(row) - 1) * 3;
}

function colToIndex(col: string) {
    return col.charCodeAt(0) - 97;
}

function indexToCol(index: number) {
    return String.fromCodePoint(index + 97);
}
