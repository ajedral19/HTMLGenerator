import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'
import style from '../../Styles/global.module.sass'

type Tooltip = {
    text: string
    className?: string
}

export default function Tooltip({ text, className }: Tooltip) {
    return <Fragment>
        <span className={cn(style.tooltip, className)}>
            <BsFillQuestionCircleFill fontSize="1.2rem" />
            <span className={cn(style.tooltip__tip)}>
                {text}
            </span>
        </span>
    </Fragment>
}