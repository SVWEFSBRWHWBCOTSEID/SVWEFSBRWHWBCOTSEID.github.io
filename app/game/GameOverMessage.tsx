import type {Status, WinType} from './[id]/page';


export type GameOverMessageProps = {status: Status, type: WinType | null}
export default function GameOverMessage(props: GameOverMessageProps) {
    return (
        <div className="px-4 py-2 text-[#ccc] border-t border-tertiary text-center">
            <strong className="text-lg mb-1">
                {props.status === 'FIRST_WON' ? (
                    '1-0'
                ) : props.status === 'SECOND_WON' ? (
                    '0-1'
                ) : (
                    '0.5-0.5'
                )}
            </strong>
            <p className="italic">
                {props.status === 'DRAW' ? (
                    // TODO: stalemate, insufficient material
                    'Draw by mutual agreement'
                ) : (
                    `${props.status === 'FIRST_WON' ? 'O' : 'X'} ${winTypeToStr(props.type)} • ${props.status === 'FIRST_WON' ? 'X' : 'O'} is victorious`
                )}
            </p>
        </div>
    )
}

function winTypeToStr(type: WinType | null) {
    switch (type) {
        case 'RESIGN': return 'resigned';
        case 'TIMEOUT': return 'timed out';
        case 'DISCONNECT': return 'left the game';
        default: return 'lost';
    }
}
