import { ReactNode } from "react"

interface Props extends React.HTMLAttributes<HTMLParagraphElement>{
    children: ReactNode
}

export function Text({ children, ...rest}: Props){
    return <p {...rest}>{children}</p>
}