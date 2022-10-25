import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    errorMessage?: string
}

export function Input({label, errorMessage='', ...rest }: Props){
    const error = !! errorMessage

    return (
        <div className="flex flex-col m-3">
            <label
                className={`font-bold text-${error ? 'error' : 'black' }`}>
                    {label}
            </label>
            <input
                className={`p-1 border-2 ${error && 'border-error focus:outline-none'} rounded`}
                {...rest}/>
            <span className="text-error text-xs">{errorMessage}</span>
        </div>
    )
}