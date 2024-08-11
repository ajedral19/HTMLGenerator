import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Templates from "./Pages/Templates";
import Generate from "./Pages/Generate";
import Home from "./Pages/Home";
import Documentation from "./Pages/Documentation";

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
        element: <Layout><Home /></Layout>
    },
    {
        path: 'documentation',
        element: <Layout><Documentation /></Layout>
    },
    {
        path: 'templates',
        children: [
            {
                index: true,
                element: <Layout><Templates /></Layout>,
            },
            {
                path: 'generate',
                element: <Layout><Generate /></Layout>
            }
        ]
    }
])

export default SiteRoutes