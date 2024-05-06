'use client'

import SecondarySlider from '../../components/SecondarySlider';


type OfflineBoardCustomizationSlidersProps = {
    rows: number,
    columns: number,
    needed: number
    setRows: (rows: number) => void,
    setColumns: (columns: number) => void,
    setNeeded: (needed: number) => void,
    resetBoard: () => void,
    maxRows?: number,
    maxColumns?: number
}
export default function OfflineBoardCustomizationSliders(props: OfflineBoardCustomizationSlidersProps) {
    const {rows, columns, needed, setRows, setColumns, setNeeded, resetBoard, maxRows, maxColumns} = props;

    // Updates the number of rows in the board, resetting the board and constraining `needed` to below
    // the new max dimension.
    function updateRows(rows: number) {
        setRows(rows);
        setNeeded(Math.min(needed, Math.max(rows, columns)));
        resetBoard();
    }

    // Updates the number of columns in the board, resetting the board and constraining `needed` to below
    // the new max dimension.
    function updateColumns(columns: number) {
        setColumns(columns);
        setNeeded(Math.min(needed, Math.max(rows, columns)));
        resetBoard();
    }

    return (
        <section className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <div className="w-56">
                <p className="mb-1.5 text-sm">Rows: <strong>{rows}</strong></p>
                <SecondarySlider
                    value={rows}
                    onChange={updateRows}
                    min={2}
                    max={maxRows ?? 10}
                    className="h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200"
                />
            </div>

            <div className="w-56">
                <p className="mb-1.5 text-sm">Columns: <strong>{columns}</strong></p>
                <SecondarySlider
                    value={columns}
                    onChange={updateColumns}
                    min={2}
                    max={maxColumns ?? 10}
                    className="h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200"
                />
            </div>

            <div className="w-56">
                <p className="mb-1.5 text-sm"># in a row to win: <strong>{needed}</strong></p>
                <SecondarySlider
                    value={needed}
                    onChange={setNeeded}
                    min={2}
                    max={Math.max(rows, columns)}
                    className="h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200"
                />
            </div>
        </section>
    )
}
