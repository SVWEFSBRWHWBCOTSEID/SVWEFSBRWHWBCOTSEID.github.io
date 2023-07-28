import {Metadata} from 'next';
import StickySidebar from '../../../components/StickySidebar';
import SectionHeader from '../../../components/SectionHeader';


export const metadata: Metadata = {
    title: 'Game rules'
}

export default function Rules() {
    return (
        <div className="container flex gap-10 pt-4 pb-12">
            <StickySidebar>
                <h3 className="font-medium text-lg mb-3">Table of contents</h3>
                <ul className="list-disc list-outside pl-8 flex flex-col gap-1 mb-3">
                    <li>
                        <a href="#ttt" className="hover:underline">Tic-Tac-Toe</a>
                    </li>
                    <li>
                        <a href="#uttt" className="hover:underline">Ultimate Tic-Tac-Toe</a>
                    </li>
                    <li>
                        <a href="#c4" className="hover:underline">Connect 4</a>
                    </li>
                    <li>
                        <a href="#pc" className="hover:underline">Pokemon Chess</a>
                    </li>
                </ul>
            </StickySidebar>
            <div className="md:pl-10 md:border-l border-tertiary py-4">
                <SectionHeader id="ttt">Tic-Tac-Toe</SectionHeader>
                <p className="mb-16">[...]</p>

                <SectionHeader id="uttt">Ultimate Tic-Tac-Toe</SectionHeader>
                <p className="mb-4">
                    Tic-Tac-Toe, except each square of the board contains an inner game of Tic-Tac-Toe.
                </p>
                <p className="mb-4">
                    Players start in the middle square{/* TODO: was this a lie?? */}, and their move in the inner
                    Tic-Tac-Toe board determines the square the next player must move in: eg. if X takes the top right
                    square of the middle board, O must now make a move in the top right <em>Tic-Tac-Toe board</em>.
                </p>
                <p className="mb-6">
                    When a player wins an inner Tic-Tac-Toe game, they take the corresponding square on the outer board.
                    If a player is sent to a won or drawn square, they may instead move anywhere on the board. Winning
                    the outer board wins the game.
                </p>
                <p className="text-sm text-secondary mb-16">
                    See also: <a href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Wikipedia</a>
                </p>

                <SectionHeader id="c4">Connect 4</SectionHeader>
                <p className="mb-16">[...]</p>

                <SectionHeader id="pc">Pokemon Chess</SectionHeader>
                <p className="mb-4">Inspired by <a href="https://pokemonchess.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">pokemonchess.com</a>.</p>
                <p className="mb-4">
                    Pokemon chess is like chess, except at the start of the game each player secretly assigns each piece
                    a unique <a href="https://pokemondb.net/type" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Pokemon type</a>.
                    When a piece attempts to capture another piece, the following happens based on the type matchup between
                    the two pieces:
                </p>
                <ul className="list-disc list-outside pl-6 flex flex-col gap-1 mb-4">
                    <li>
                        If the capturing piece is <strong>normally effective</strong> against the piece being captured,
                        the piece is taken like in regular chess.
                    </li>
                    <li>
                        If the capturing piece is <strong>super effective</strong> against the piece being captured, the
                        capturing piece gets to make an extra move after this one.
                    </li>
                    <li>
                        If the capturing piece is <strong>not very effective</strong> against the piece being captured,
                        both pieces are captured instead.
                    </li>
                    <li>
                        If the capturing piece has <strong>no effect</strong> against the piece being captured, nothing
                        happens and your turn ends.
                    </li>
                </ul>
                <p className="mb-4">
                    There is no concept of check in Pokemon chess, as the king may be immune to certain pieces depending
                    on their type<sup>1</sup>. Instead, the game is won by capturing the opponent's king.
                </p>
                <p className="mb-6">
                    For additional fun, a capture has a 1/10 chance to become a "miss" or a 1/16 chance to become a
                    "critical hit". If the capture is a miss, the move has no effect regardless of type matchups (nothing
                    happens, and the turn is over). If the capture is a critical hit, the move is super effective regardless
                    of type matchups (the capturing piece may make an extra move after this one).
                </p>
                <p className="text-sm text-secondary mb-2">
                    <sup>1</sup> Consequently, the king is not prevented from castling through, into, or out of check.
                </p>
                <p className="text-sm text-secondary">
                    See also: <a href="https://www.reddit.com/r/PokemonChess/comments/12jaqu7/a_starter_guide_to_pokemon_chess/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Reddit post explaining Pokemon chess</a>
                </p>
            </div>
        </div>
    )
}
