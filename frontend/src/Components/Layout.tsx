import { Fragment } from "react/jsx-runtime";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Layout = {
    children: React.ReactNode
}

export default function Layout({ children }: Layout) {
    return <Fragment>
        <Navbar />
        <div className="container">
            {children}
        </div>
        <Footer />
    </Fragment>
}