import { Fragment } from "react/jsx-runtime";

export default function Footer() {
    return (
        <Fragment>
            <footer className="mt-3">
                <div className="container footer pt-1">
                    <small className="footer-mark">&copy; Copyright {new Date().getFullYear()}</small>
                </div>
            </footer>
        </Fragment>
    )
}