import { Fragment } from "react/jsx-runtime";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Layout = {
    children: React.ReactNode
}

export default function Layout({ children }: Layout) {
    return <Fragment>
        <div className="view">
            <Navbar />
            <div className="container main">
                {children}
            </div>
            <Footer />
        </div>
    </Fragment>
}