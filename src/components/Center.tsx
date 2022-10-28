import { ReactNode } from "react"
import classnames from "classnames"

interface Props {
    children: ReactNode
    column?: boolean
}

export function Center({ children, column = false  }: Props){
    return(
        <div className={classnames('w-full', 'h-full', 'flex', 'justify-center', 'items-center', {'flex-col': column})} >
            {children}
        </div>
    )
}