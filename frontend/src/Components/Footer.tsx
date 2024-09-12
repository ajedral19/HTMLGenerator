import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'

export default function Footer({className}: {className: string}) {
    return (
        <Fragment>
            <footer className="mt-3">
                <div className={cn("container footer pt-1", className)}>
                    <small className="footer-mark">&copy; Copyright {new Date().getFullYear()}</small>
                </div>
            </footer>
        </Fragment>
    )
}