import cn from 'classnames'
import style from '../../Styles/stripTag.module.sass'
import { Tag } from '../../types'

export default function StripTag({ text, url, variant = "purple", size = "normal", className }: Tag) {

    if (url) return (
        <a href={url}>
            <span className={cn(style['strip-tag'], style[variant], style[size], className)}>
                {text}
            </span>
        </a>
    )

    return (
        <span role='link' className={cn(style['strip-tag'], style[variant])}>
            {text}
        </span>
    )
}