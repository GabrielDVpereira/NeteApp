import { ReactNode } from "react";

interface Props extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>{
    children: ReactNode
}

export function Form ({ children, ...rest }: Props){
    return <form className="w-full" {...rest}>{children}</form>
}