import { ReactNode } from "react"
import classnames from 'classnames'
interface Props {
    children: ReactNode
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '3xl'
}

export function Title({ children, size  = 'xl'}: Props){
    return <h1 className={classnames(`text-${size}`, 'font-bold')}>{children}</h1>
}