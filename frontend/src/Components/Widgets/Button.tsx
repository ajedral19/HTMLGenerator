import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'

type Button = {
    text?: string
    title?: string
    id?: string
    name?: string
    type?: 'submit' | 'reset' | 'button'
    variant?: "primary" | "secondary" | "subtle" | "danger" | "transparent"
    icon?: boolean
    children?: React.ReactNode
    className?: string
    onClick?: () => void
}

export default function Button({ text, title, id, name, type, variant, icon, onClick, className, children }: Button) {
    return <Fragment>
        <button onClick={onClick} type={type} title={title} className={cn("btn", { [variant || ""]: variant }, { icon: icon }, className)} id={id} name={name}>
            {
                text || children
            }
        </button>
    </Fragment>
}