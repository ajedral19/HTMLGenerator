import { Fragment } from "react/jsx-runtime";
import Navbar from "../Navbar";
import Footer from "../Footer";
import cn from 'classnames'

type Layout = {
    children: React.ReactNode,
    wide?: boolean
}

export default function Layout({ children, wide }: Layout) {
    return <Fragment>
        <div className="view">
            <Navbar className={cn({wide})} />
            <div className={cn("container main", { wide })}>
                {children}
            </div>
            <Footer className={cn({wide})} />
        </div>
    </Fragment>
}