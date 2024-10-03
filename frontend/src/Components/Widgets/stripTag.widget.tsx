import cn from 'classnames'
import style from '../../Styles/stripTags.module.sass'
type StripTag = {
    text: string,
    url?: string,
    variant?: "purple" | "teal",
    size?: "normal" | "small"
    className?: string
}

export default function StripTag({ text, url, variant = "purple", size = "normal", className }: StripTag) {

    if (url) return (
        <a href={url}>
            <blockquote className={cn(style['strip-tag'], style[variant], style[size], className)}>
                {text}
            </blockquote>
        </a>
    )

    return (
        <blockquote role='link' className={cn(style['strip-tag'], style[variant])}>
            {text}
        </blockquote>
    )
}