import { ReactNode } from "react"

interface Props {
    children: ReactNode
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '3xl'
}

export function Title({ children, size  = 'xl'}: Props){
    return <h1 className={`text-${size} font-bold underline`}>{children}</h1>
}