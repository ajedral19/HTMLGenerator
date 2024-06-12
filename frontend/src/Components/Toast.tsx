import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'


type Toast = {
    content: string,
    type: 'success' | 'warning' | 'error',
}

export default function Toast({ content, type }: Toast) {

    return <Fragment>
        <div className={cn("toast", { [type]: type })}>
            {content}
        </div>
    </Fragment>
}