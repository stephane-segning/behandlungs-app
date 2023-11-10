import log from 'electron-log/renderer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/router'
import { Provider } from 'react-redux'
import { store } from './hooks/redux'

console.log = log.log
console.error = log.error
console.warn = log.warn
console.info = log.info

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
