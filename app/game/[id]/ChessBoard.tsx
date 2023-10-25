'use client'

import {useState, ReactNode, useMemo, useEffect} from 'react';
import {DndProvider, DragPreviewImage, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend, getEmptyImage} from 'react-dnd-html5-backend';
import {Chess, Square as ChessSquare, Piece as ChessPiece} from 'chess.js';
import {indexToCol} from './TicTacToeGame';


export default function ChessBoard() {
    const chess = useMemo(() => new Chess(), []);
    const [activeSquare, setActiveSquare] = useState<ChessSquare | null>(null);
    const [boardState, setBoardState] = useState(chess.board());

    function makeMove(square: ChessSquare) {
        chess.move({from: activeSquare!, to: square});
        setBoardState(chess.board());
        setActiveSquare(null);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-8 w-max bg-[url('https://lichess1.org/assets/_dyH7V1/images/board/svg/brown.svg')]">
                {boardState.map((row, i) => {
                    return row.map((value, j) => {
                        const san = indexToCol(j) + (8 - i) as ChessSquare;
                        const dark = (i + j) % 2 === 1;

                        return (
                            <ChessBoardSquare
                                square={san}
                                move={makeMove}
                                chess={chess}
                                activeSquare={activeSquare}
                                dark={dark}
                                key={i + j}
                            >
                                {value && (
                                    <Piece
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
    dark: boolean,
    children: ReactNode
}
function ChessBoardSquare(props: ChessBoardSquareProps) {
    const {chess, square, move, activeSquare, dark} = props;
    const active = canMove(chess, activeSquare, square);

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: 'piece',
        canDrop: () => active,
        drop: () => move(square),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    }), [square, active])

    console.log(square, activeSquare, chess.moves({square: activeSquare!}))

    // TODO: disable if no moves
    return (
        <button
            ref={drop}
            onClick={() => active && move(square)}
            onMouseDown={(e) => active && e.stopPropagation()}
            disabled={!active && !props.children}
            className={'w-24 h-24' + (square === activeSquare ? ' bg-[rgba(20,_85,_30,_0.5)]' : !active ? '' : canDrop && isOver ? ' bg-[rgba(20,_85,_30,_0.3)]' : props.children ? ' bg-[radial-gradient(transparent_0%,_transparent_79%,_rgba(20,_85,_0,_0.3)_80%)] hover:bg-none hover:bg-[rgba(20,_85,_30,_0.3)]' : ' bg-[radial-gradient(rgba(20,_85,_30,_0.5)_19%,_rgba(0,_0,_0,_0)_20%)] hover:bg-none hover:bg-[rgba(20,_85,_30,_0.3)]')}
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

type PieceProps = {
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

    const pieceWithSide = props.piece.color + props.piece.type.toUpperCase();

    return (
        <img
            ref={drag}
            src={`/pieces/${pieceWithSide}.svg`}
            alt={pieceWithSide}
            onMouseDown={() => props.setActiveSquare(props.square)}
            // onBlur={() => props.setActivePiece(-1)}
            className={'w-full h-full' + (isDragging ? ' opacity-50' : '')}
        />
    )
}
