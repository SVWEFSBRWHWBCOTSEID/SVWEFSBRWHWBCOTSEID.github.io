type SecondarySliderProps = {value: number, onChange: (value: number) => void, min: number, max: number}
export default function SecondarySlider(props: SecondarySliderProps) {
    return (
        <input
            type="range"
            className="w-full h-5 appearance-none cursor-pointer border border-tertiary rounded-full bg-[rgb(186_186_186_/_0.3)] slider-thumb:appearance-none slider-thumb:w-8 slider-thumb:h-5 slider-thumb:rounded-full slider-thumb:bg-content-tertiary slider-thumb:border slider-thumb:border-solid slider-thumb:border-secondary/75"
            value={props.value}
            onChange={(e) => props.onChange(Number(e.target.value))}
            min={props.min}
            max={props.max}
        />
    )
}
