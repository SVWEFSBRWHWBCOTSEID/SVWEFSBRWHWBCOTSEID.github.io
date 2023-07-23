'use client'

import {useState} from 'react';
import type {GameInfo} from './page';

// Components
import Game, {UpdateGameStatesCallbacks} from './Game';
import TicTacToeBoard, {BoardStatus, defaultTTTBoard, TTTBoard, TTTSymbol} from './TicTacToeBoard';


export default function TicTacToeGame(props: {id: string, username?: string, info: GameInfo}) {
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const playerSymbol: TTTSymbol = getTTTSymbolFromUsername(props.username, props.info);

    function updateGameStatesFromMoves(moves: string[], {setGameStates, setGameStateIndex}: UpdateGameStatesCallbacks<TTTBoard>) {
        setGameStates((gameStates) => {
            const arr = gameStates.slice();
            let symbol: TTTSymbol = arr.length % 2 === 0 ? '◯' : '✕';

            for (let i = 0; i < moves.length; i++) {
                const [, col, row] = moves[i].match(/(\w)(\d)/)!;
                const state = arr.at(-1)!.slice() as TTTBoard;

                state[rowToIndex(row) + colToIndex(col)] = symbol;
                arr.push(state);

                symbol = symbol === '✕' ? '◯' : '✕';
            }

            // If the player is viewing the last move, keep them on the last move when new moves are added
            setGameStateIndex((gameStateIndex) => gameStateIndex === gameStates.length - 1 ? arr.length - 1 : gameStateIndex);

            console.log(arr);
            return arr;
        });
    }

    // Makes a move by checking the given square.
    async function setSquare(square: number) {
        const col = square % 3;
        const row = (square - col) / 3

        await fetch(`${process.env.API_BASE}/game/${props.id}/move/${indexToCol(col)}${row + 1}`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        <Game {...props} defaultBoard={defaultTTTBoard} updateGameStatesFromMoves={updateGameStatesFromMoves}>
            {(gameStates, gameStateIndex) => (
                <TicTacToeBoard
                    boardState={gameStates[gameStateIndex]}
                    playerSymbol={playerSymbol}
                    setSquare={setSquare}
                    setBoardStatus={setGameStatus}
                    disabled={gameStatus !== BoardStatus.PLAYING || gameStateIndex !== gameStates.length - 1} // TODO
                />
            )}
        </Game>
    )
}

export function getTTTSymbolFromUsername(username: string | undefined, info: GameInfo): TTTSymbol {
    if (username === info.first.username) return '✕';
    if (username === info.second.username) return '◯';
    return '';
}

export function rowToIndex(row: string) {
    return (Number(row) - 1) * 3;
}

export function colToIndex(col: string) {
    return col.charCodeAt(0) - 97;
}

export function indexToCol(index: number) {
    return String.fromCodePoint(index + 97);
}
