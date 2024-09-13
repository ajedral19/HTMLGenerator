import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Templates from "./Pages/Templates";
import Generate from "./Pages/Generate";
import Home from "./Pages/Home";
import Documentation from "./Pages/Documentation";
import ApplicationLayout from "./Components/ApplicationLayout";
import LiveEditor from "./Pages/LiveEditor";
import Backlog from "./Pages/Backlog";

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
                element: <Layout><ApplicationLayout><Templates /></ApplicationLayout></Layout>,
            },
            {
                path: 'live-editor',
                element: <Layout><ApplicationLayout><LiveEditor /></ApplicationLayout></Layout>
            },
            {
                path: 'generate',
                element: <Layout><ApplicationLayout><Generate /></ApplicationLayout></Layout>
            }
        ]
    },
    {
        path: 'backlog',
        children: [
            {
                index: true,
                element: <Layout><Backlog /></Layout>
            }
        ]
    }
])

export default SiteRoutes