import cn from 'classnames'
import style from '../../Styles/stripTags.module.sass'
type StripTag = {
    text: string,
    url?: string,
    variant?: "purple" | "teal"
}

export default function StripTag({ text, url, variant = "purple" }: StripTag) {
    return <blockquote className={cn(style['strip-tag'], style[variant])}>
        {
            url ?
                <a href={url}>{text}</a>
                : text
        }
    </blockquote>
}