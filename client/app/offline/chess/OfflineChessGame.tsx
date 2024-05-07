'use client'

import {useMemo, useState} from 'react';
import {Chess, Square as ChessSquare} from 'chess.js';

// Components
import ChessBoard from '../../game/[id]/ChessBoard';
import OfflineScoreIndicator, {Scores} from '../OfflineScoreIndicator';
import OfflineMoveIndicator from '../OfflineMoveIndicator';
import ScaledBox from '../../../components/ScaledBox';

// Util
import {alternatePlayerSymbol} from '../../game/[id]/TicTacToeGame';
import {BoardStatus, PlayerSymbol} from '../../game/[id]/TicTacToeBoard';


export default function OfflineChessGame() {
    const chess = useMemo(() => new Chess(), []);
    const [boardState, setBoardState] = useState(chess.board());

    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [scores, setScores] = useState<Scores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>(PlayerSymbol.FIRST);
    const [nextStartSymbol, setNextStartSymbol] = useState<PlayerSymbol>(PlayerSymbol.SECOND);

    // Makes a move by updating the chess state, alternating the player's symbol after each move.
    function makeMove(from: ChessSquare, to: ChessSquare) {
        chess.move({from, to});

        // Check board status and handle accordingly
        const status = getStatus(chess, playerSymbol);
        setGameStatus(status);

        setBoardState(chess.board());
        setPlayerSymbol(alternatePlayerSymbol(playerSymbol));

        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (status) {
            case BoardStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case BoardStatus.FIRST_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case BoardStatus.SECOND_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        chess.reset();
        setBoardState(chess.board());
        setGameStatus(BoardStatus.PLAYING);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(alternatePlayerSymbol(nextStartSymbol));
    }

    return (
        <main className="flex-grow flex flex-col gap-4 items-center justify-center px-4 min-h-0 pb-8 sm:pb-12 md:pb-16">
            <OfflineScoreIndicator
                scores={scores}
                firstColor="bg-white"
                secondColor="bg-black"
            />

            <ScaledBox className="w-full">
                <ChessBoard
                    chess={chess}
                    boardState={boardState}
                    makeMove={makeMove}
                    disabled={gameStatus !== BoardStatus.PLAYING}
                    over={gameStatus !== BoardStatus.PLAYING}
                />
            </ScaledBox>

            <OfflineMoveIndicator
                status={gameStatus}
                currPlayer={playerSymbol}
                first={<img src="/pieces/wK.svg" className="h-8" alt="white" />}
                second={<img src="/pieces/bK.svg" className="h-8" alt="black" />}
                resetBoard={resetBoard}
            />
        </main>
    )
}

function getStatus(chess: Chess, symbol: PlayerSymbol) {
    if (!chess.isGameOver()) return BoardStatus.PLAYING;
    if (chess.isDraw()) return BoardStatus.TIED;
    return symbol === PlayerSymbol.FIRST ? BoardStatus.FIRST_VICTORY : BoardStatus.SECOND_VICTORY;
}
