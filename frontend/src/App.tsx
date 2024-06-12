
import { Fragment } from 'react/jsx-runtime'
import Modal from './Components/Modal'
import SiteRoutes from './SiteRoutes'
import './Styles/App.sass'
import './Styles/Layout.sass'

function App() {
  return (
    <Fragment>
      <Modal />
      <SiteRoutes />
    </Fragment>
  )
}

export default App
