import classname from 'classnames'
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorMessage?: string
    full?: boolean
}

export function Input({label, errorMessage='', full = true, ...rest }: Props){
    const error = !! errorMessage

    return (
        <div className={classname('flex', 'flex-col', 'p-2', {'w-full': full} )}>
            <label
                className={ classname('font-bold', {'text-error': error})}>
                    {label}
            </label>
            <input
                className={
                    classname('p-1', 'border-2', 'rounded', {
                        'border-error': error,
                        'focus:outline-none': error
                    })
                }
                {...rest}
            />
            <span className="text-error text-xs">{errorMessage}</span>
        </div>
    )
}