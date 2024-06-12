import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Layout from "./Components/Layout";
import Templates from "./Pages/Templates";
import Generate from "./Pages/Generate";
import Home from "./Pages/Home";
import Documentation from "./Pages/Documentation";

export default function SiteRoutes() {
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route handle={"home"} path="/" element={<Layout><Home /></Layout>} />
                    <Route handle={"documentation"} path="/documentation" element={<Layout><Documentation /></Layout>} />
                    <Route handle={"templates"} path="/templates" element={<Layout><Templates /></Layout>} />
                    <Route handle={"generate"} path="/generate" element={<Layout><Generate /></Layout>} />

                    <Route handle={"error"} path="*" element={<Layout><h1>Oops! page not found</h1></Layout>} />
                </Routes>
            </Router>
        </Fragment >
    )
}