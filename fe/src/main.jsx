import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import RootRouter from './router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { Toaster } from './components/ui/toaster'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>

      <Provider store={store}>
        <Toaster />
        <RootRouter />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
