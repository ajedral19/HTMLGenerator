import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'
import style from '../../Styles/button.module.sass'
import { IconType } from "react-icons/lib";

type Button = {
    text?: string
    icon?: JSX.Element
    title?: string
}

export default function Button({ text, icon, title }: Button) {
    return <Fragment>
        <button className={cn("btn primary", { ['icon']: icon && !text }, { ['icon-text']: icon && text })} title={title}>
            {
                icon && text ?
                    <Fragment>
                        {icon} <span>{text}</span>
                    </Fragment> :
                    icon ? icon :
                        text
            }
        </button>
    </Fragment>
}