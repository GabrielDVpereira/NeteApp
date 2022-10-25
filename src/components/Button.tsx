import { ReactNode, ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    styleType?: 'primary' | 'secondary' | 'error',
    size?: 'full' | 'half' | 'third' | 'quarter' | 'default'
}

interface ButtonStyle {
    [index: string]: string
}

export function Button({ children, styleType='primary', size='default', ...rest }: Props){
    const buttonSize: ButtonStyle = {
        'full': 'w-full',
        'half': 'w-1/2',
        'third': 'w-1/3',
        'quarter': 'w-1/4',
        'default': ''
    }

    const customClass = `
        bg-${styleType}
        hover:bg-${styleType}-dark
        text-${styleType}-contrast
        ${buttonSize[size]}
    `

    return (
        <div className="p-2">
            <button
            className={`${customClass} font-bold py-2 px-4 rounded`} {...rest}>
                {children}
            </button>
        </div>
    )
}