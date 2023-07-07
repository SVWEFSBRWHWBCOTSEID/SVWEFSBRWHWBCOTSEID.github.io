'use client'

import {useEffect, useState} from 'react';
import {Duration} from 'luxon';

// Components
import Chat from '../../Chat';
import GameHeader from '../../GameHeader';
import GameStateIndicator from '../../GameStateIndicator';
import TicTacToeBoard, {BoardStatus, defaultTTTBoard, TTTBoard, TTTSymbol} from './TicTacToeBoard';


export default function TicTacToeGame(props: {id: string}) {
    const [gameState, setGameState] = useState<TTTBoard>(defaultTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');

    const [ftime, setFtime] = useState(Duration.fromObject({minutes: 3, seconds: 23, milliseconds: 200}));
    const [stime, setStime] = useState(Duration.fromObject({minutes: 1, seconds: 20, milliseconds: 200}));

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
            const message = JSON.parse(m.data);
        }
    }, [])

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    function setSquare(square: number, symbol: TTTSymbol) {
        const newGameState: TTTBoard = [...gameState]
        newGameState[square] = symbol;
        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
    }

    return (
        <>
            <div className="flex flex-col gap-5 w-[21rem]">
                <GameHeader game="ttt" />
                <Chat />
            </div>

            <TicTacToeBoard
                boardState={gameState}
                playerSymbol={playerSymbol}
                setSquare={setSquare}
                setBoardStatus={setGameStatus}
                disabled={gameStatus !== BoardStatus.PLAYING}
            />

            <GameStateIndicator ftime={ftime} stime={stime} />
        </>
    )
}
