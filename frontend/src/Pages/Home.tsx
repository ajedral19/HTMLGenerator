import { Outlet } from "react-router";
import { Fragment } from "react";

export default function Home() {
    return (
        <Fragment>
            <h1 className="title title--2">How to use Textbook Generator</h1>
            <Outlet />
        </Fragment>
    )
}