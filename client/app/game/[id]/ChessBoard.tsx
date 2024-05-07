'use client'

import {useState, ReactNode, useEffect} from 'react';
import {DndProvider, DragPreviewImage, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend, getEmptyImage} from 'react-dnd-html5-backend';
import {Chess, Square as ChessSquare, Piece as ChessPiece} from 'chess.js';
import {indexToCol} from './TicTacToeGame';


type ChessBoardProps = {
    chess: Chess,
    boardState: ReturnType<Chess['board']>,
    makeMove: (from: ChessSquare, to: ChessSquare) => void,
    disabled: boolean,
    over: boolean
}
export default function ChessBoard(props: ChessBoardProps) {
    const {chess, over} = props;
    const [activeSquare, setActiveSquare] = useState<ChessSquare | null>(null);

    function makeMove(square: ChessSquare) {
        props.makeMove(activeSquare!, square);
        setActiveSquare(null);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={"grid grid-cols-[repeat(8,_8rem)] grid-rows-[repeat(8,_8rem)] w-max bg-[url('https://lichess1.org/assets/_dyH7V1/images/board/svg/brown.svg')] transition-opacity duration-300" + (over ? ' opacity-50' : '')}>
                {props.boardState.map((row, i) => {
                    return row.map((value, j) => {
                        const san = indexToCol(j) + (8 - i) as ChessSquare;

                        return (
                            <ChessBoardSquare
                                square={san}
                                move={makeMove}
                                chess={chess}
                                activeSquare={activeSquare}
                                over={over}
                                key={i + j}
                            >
                                {value && (
                                    <Piece
                                        chess={chess}
                                        piece={value}
                                        square={san}
                                        activeSquare={activeSquare}
                                        setActiveSquare={setActiveSquare}
                                    />
                                )}
                            </ChessBoardSquare>
                        )
                    })
                })}
            </div>
        </DndProvider>
    )
}

type ChessBoardSquareProps = {
    chess: Chess,
    square: ChessSquare,
    move: (square: ChessSquare) => void;
    activeSquare: ChessSquare | null,
    children: ReactNode,
    over: boolean
}
function ChessBoardSquare(props: ChessBoardSquareProps) {
    const {chess, square, move, activeSquare, over} = props;

    const active = canMove(chess, activeSquare, square);
    const disabled = chess.moves({square}).length === 0;

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: 'piece',
        canDrop: () => active,
        drop: () => move(square),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    }), [square, active])

    const lastMove = chess.history({verbose: true}).at(-1);
    const isLastMove = lastMove?.from === square || lastMove?.to === square;

    // Gets the background tailwind class for the square based on whether it's active, or is a move option
    // for the active square
    function getSquareBackground() {
        if (square === activeSquare) return 'bg-active-square'; // Current square is the piece being moved
        const base = isLastMove ? 'bg-last-move' : ''; // Current square was part of the last move

        if (!active) return base;
        if (canDrop && isOver) return base + ' bg-move-option'; // Current square is being hovered via drag -> solid bg
        if (props.children) return base + ' bg-[radial-gradient(transparent_0%,_transparent_79%,_rgba(20,_85,_0,_0.3)_80%)] hover:bg-none hover:bg-move-option'; // Piece in current square -> bg at corners
        return base + ' bg-[radial-gradient(rgba(20,_85,_30,_0.5)_19%,_rgba(0,_0,_0,_0)_20%)] hover:bg-none hover:bg-move-option' // No piece -> dot
    }

    return (
        <button
            // @ts-ignore
            ref={drop}
            onClick={() => active && move(square)}
            onMouseDown={(e) => active && e.stopPropagation()}
            disabled={over || !active && disabled}
            className={'w-full h-full ' + getSquareBackground()}
        >
            {props.children}
        </button>
    )
}

function canMove(chess: Chess, activeSquare: ChessSquare | null, square: ChessSquare) {
    if (!activeSquare) return false;
    const moves = chess.moves({square: activeSquare});

    if (activeSquare === 'e1' && (moves.includes('O-O') && square === 'g1' || moves.includes('O-O-O') && square === 'c1')) return true;
    if (activeSquare === 'e8' && (moves.includes('O-O') && square === 'g8' || moves.includes('O-O-O') && square === 'c8')) return true;
    return moves.some(m => m.includes(square));
}

type Side = 'w' | 'b';
type Piece = 'P' | 'B' | 'N' | 'R' | 'K' | 'Q';
type ChessPieceWithSide = `${Side}${Piece}` | '';

function getActiveIndices(board: ChessPieceWithSide[], activeIndex: number | null, side: Side) {
    const activeIndices: number[] = [];
    if (activeIndex === null) return activeIndices;

    function moveOrCapture(index: number) {
    }

    function capture(index: number) {
        const piece = board[index];
        if (!piece) return;
        if (piece[0] === side) return; // TODO: premoves?
        activeIndices.push(index);
    }

    function getBishopMoves() {
        for (let i = activeIndex!; i < board.length; i += 9) {
            if (board[i]) {
                capture(i);
                break;
            }
            activeIndices.push(i);
        }
        for (let i = activeIndex!; i >= 0; i -= 9) {
            if (board[i]) {
                capture(i);
                break;
            }
            activeIndices.push(i);
        }
        // TODO: anti-diag
    }

    function getRookMoves() {
        const rowNum = activeIndex! % 8;
        for (let i = activeIndex!; i < activeIndex! + (8 - rowNum); i++) {
            if (board[i]) {
                capture(i);
                break;
            }
            activeIndices.push(i);
        }
        for (let i = activeIndex!; i >= activeIndex! - rowNum; i--) {
            if (board[i]) {
                capture(i);
                break;
            }
            activeIndices.push(i);
        }
        for (let i = activeIndex!; i < board.length; i += 8) {
            if (board[i]) {
                capture(i);
                break;
            }
            activeIndices.push(i);
        }
        for (let i = activeIndex!; i >= 0; i -= 8) {
            if (board[i]) {
                capture(i);
                break;
            }
            activeIndices.push(i);
        }
    }

    switch (board[activeIndex][1]) {
        case 'P':
            const row = side === 'w' ? 8 : -8;
            if (!board[activeIndex + row]) activeIndices.push(activeIndex + row); // Move 1 forwards
            capture(activeIndex + row - 1); // Capture left
            capture(activeIndex + row + 1); // Capture right
            // TODO: move 2 spaces if first move
            // TODO: en passant
            break;
        case 'B':
            getBishopMoves();
            break;
        case 'R':
            getRookMoves();
            break;
        case 'Q':
            getBishopMoves();
            getRookMoves();
            break;
    }

    return activeIndices;
}

type PieceProps = {
    chess: Chess,
    piece: ChessPiece,
    square: ChessSquare,
    activeSquare: ChessSquare | null,
    setActiveSquare: (s: ChessSquare | null) => void
}
function Piece(props: PieceProps) {
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: 'piece',
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    // useEffect(() => {
    //     preview(getEmptyImage(), { captureDraggingState: true });
    // });

    const isCheck = props.piece.type === 'k' && props.chess.isAttacked(props.square, props.piece.color === 'w' ? 'b' : 'w');
    const pieceWithSide = props.piece.color + props.piece.type.toUpperCase();

    return (
        <img
            // @ts-ignore
            ref={drag}
            src={`/pieces/${pieceWithSide}.svg`}
            alt={pieceWithSide}
            onMouseDown={() => props.setActiveSquare(props.square)}
            // onBlur={() => props.setActivePiece(-1)}
            className={'w-full h-full translate-x-0 translate-y-0' + (isDragging ? ' opacity-50' : '') + (isCheck ? ' bg-[radial-gradient(ellipse_at_center,_rgb(255,_0,_0)_0%,_rgb(231,_0,_0)_25%,_rgba(169,_0,_0,_0)_89%,_rgba(158,_0,_0,_0)_100%)]' : '')}
        />
    )
}
