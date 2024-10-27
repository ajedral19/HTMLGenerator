import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'
import style from '../../Styles/global.module.sass'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loaderState } from "../../Redux/Slices/loader";

export default function ProgressBar() {
    const dispatch = useDispatch()
    const loader = useSelector((state: { loader: { progress: number, max: number } }) => state.loader)
    const { progress } = loader

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (progress >= 100) {
                dispatch(loaderState({ progress: 0, max: 0 }))
                clearTimeout(timeout)
            }
        }, 1000)

    }, [progress])

    return <Fragment>
        {
            progress ?
                <span className={cn(style.progress_bar)} style={{ "--__w": `${progress}%` } as React.CSSProperties}></span>
                : null
        }
    </Fragment>
}