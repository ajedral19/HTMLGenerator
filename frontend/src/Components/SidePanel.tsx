import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'

export default function SidePanel({ className }: { className: string }) {
    return <Fragment>
        <div role="sidebar" className={cn("panel panel--sidebar", className)}>
            <ul className="categories">
                <li className="item">
                    <Link to="/templates">Templates</Link>
                </li>
                <li className="item">
                    <Link to="/templates/generate">Generate</Link>
                </li>
                <li className="item">
                    <Link to="/templates/live-editor">Live Editor</Link>
                </li>
                <li className="item">
                    <Link to="/templates/bucket">Bucket</Link>
                </li>
            </ul>
        </div>
    </Fragment>
}