import { createBrowserRouter, useRouteError } from "react-router-dom";
import Layout from "./Components/Layouts/Layout";
import Templates from "./Pages/Templates";
import Home from "./Pages/Home";
import Documentation from "./Pages/Documentation";
import Fiddle from "./Pages/Fiddle";
import { TemplateApp } from "./Components/Layouts";
import BucketGateway from "./Pages/BucketGateway";


// export default function SiteRoutes() {
//     return (
//         <Fragment>
//             <Router>
//                 <Routes>
//                     <Route handle={"home"} path="/" element={<Layout><Home /></Layout>} />
//                     <Route handle={"documentation"} path="/documentation" element={<Layout><Documentation /></Layout>} />
//                     <Route handle={"templates"} path="/templates" element={<Layout><Templates /></Layout>}>
//                         <Route handle={"generate"} path="generate" element={<Generate />} />
//                     </Route>

//                     <Route handle={"error"} path="*" element={<Layout><h1>Oops! page not found</h1></Layout>} />
//                 </Routes>
//             </Router>
//         </Fragment >
//     )   
// }
const SiteRoutes = createBrowserRouter([
    {
        path: '/',
        // errorElement: <h1>Ooops! Got into trouble</h1>,
        ErrorBoundary: () => {
            const error = useRouteError()
            if (error)
                console.log(error, "oops! we have to log this error and inform the developer");

            return <h2>Boundary Hehe!</h2>
        },
        children: [
            {
                index: true,
                element: <Layout><Home /></Layout>,
            },
            {
                path: `documentation`,
                element: <Layout><Documentation /></Layout>,
                children: [
                    {
                        path: ':subpage',
                        element: <Layout><Documentation /></Layout>,
                        children: [
                            {
                                path: ':subpage',
                                element: <Layout><Documentation /></Layout>,
                                children: [
                                    {
                                        path: ':subpage',
                                        element: <Layout><Documentation /></Layout>
                                    }
                                ]
                            }
                        ],
                    }
                ]
            },
            {
                path: `templates`,
                children: [
                    {
                        index: true,
                        element: <Layout><TemplateApp><Templates /></TemplateApp></Layout>,
                    },
                    {
                        path: 'fiddle',
                        element: <Layout><TemplateApp><Fiddle /></TemplateApp></Layout>
                    },
                    {
                        path: 'bucket',
                        element: <Layout><TemplateApp><BucketGateway /></TemplateApp></Layout>
                    }
                ]
            },
            {
                path: "*",
                element: <h1>Oops! Error 404 - Page not found</h1>
            }
        ]
    },
])

export default SiteRoutes