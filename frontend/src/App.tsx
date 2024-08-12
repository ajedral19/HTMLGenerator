
import { Fragment } from 'react/jsx-runtime'
import Modal from './Components/Modal'
import SiteRoutes from './SiteRoutes'
import './Styles/App.sass'
import './Styles/Layout.sass'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <Modal />
      {/* <SiteRoutes /> */}
      <RouterProvider router={SiteRoutes} />
    </Fragment>
  )
}

export default App
