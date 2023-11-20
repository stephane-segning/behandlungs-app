import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/router'
import { Provider } from 'react-redux'
import { store } from './hooks/redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
