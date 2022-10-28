import classnames from 'classnames'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement>{
    className?: string
    src: string
}

export function Image({ className, src, ...rest } : Props) {
    return <img className={classnames('w-5/6', 'lg:w-4/6', className)} src={src} {...rest}/>
}