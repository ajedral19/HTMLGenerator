import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'

type Button = {
    text: string
    id?: string
    name?: string
    type?: 'submit' | 'reset' | 'button'
    variant?: "primary" | "secondary" | "subtle" | "danger"
    onClick?: () => void
}

export default function Button({ text, id, name, type, variant, onClick }: Button) {
    return <Fragment>
        <button onClick={onClick} type={type} className={cn("btn", { [variant || ""]: variant })} id={id} name={name}>{text}</button>
    </Fragment>
}