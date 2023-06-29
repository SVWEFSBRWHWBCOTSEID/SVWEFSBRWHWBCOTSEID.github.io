type SecondarySliderProps = {
    value: number, onChange: (value: number) => void,
    min: number, max: number, step?: number,
    className?: string
}
export default function SecondarySlider(props: SecondarySliderProps) {
    return (
        <input
            type="range"
            className={'w-full appearance-none cursor-pointer border border-tertiary rounded-full bg-[rgb(186_186_186_/_0.3)] slider-thumb:appearance-none slider-thumb:rounded-full slider-thumb:bg-content-tertiary slider-thumb:border slider-thumb:border-solid slider-thumb:border-secondary/75' + (props.className ? ` ${props.className}` : '')}
            value={props.value}
            onChange={(e) => props.onChange(Number(e.target.value))}
            min={props.min}
            max={props.max}
            step={props.step}
        />
    )
}
