
import { Fragment } from 'react/jsx-runtime'
import SiteRoutes from './SiteRoutes'
import './Styles/App.sass'
import './Styles/Layout.sass'
import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'


function App() {

  useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register('/service_worker.js')
        .then(() => console.log("Service Worker: Registered"))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    }
  }, [])

  return (
    <Fragment>
      {/* <SiteRoutes /> */}
      <RouterProvider router={SiteRoutes} />
    </Fragment>
  )
}

export default App
