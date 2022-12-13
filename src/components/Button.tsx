import { ReactNode, ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    styleType?: 'primary' | 'secondary' | 'error' | 'success'
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
    const getCustomClass = () => {
        if(styleType === 'success'){
            return "bg-success hover:bg-success-dark"
        }

        return `
            bg-${styleType}
            hover:bg-${styleType}-dark
        `
    }

    return (
        <div className={`p-2 ${buttonSize[size]}`}>
            <button
                className={`${getCustomClass()} text-white ${buttonSize[size]} font-bold py-2 px-4 rounded`}
                {...rest}
            >
                {children}
            </button>
        </div>
    )
}