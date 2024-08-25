import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './Styles/Global.sass'
import { Provider } from 'react-redux'
import store from './store.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>,
)
