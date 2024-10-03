import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'
import style from '../../Styles/button.module.sass'

export default function Button() {
    return <Fragment>
        <button className={cn("btn primary")}>Generate</button>
    </Fragment>
}