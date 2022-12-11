import classnames from 'classnames'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement>{
    className?: string
    alt?: string
    src: string
}

export function Image({ className, src, alt, ...rest } : Props) {
    return <img
        className={className || classnames('w-5/6', 'lg:w-4/6')}
        src={src}
        alt={alt}
        {...rest}
    />
}