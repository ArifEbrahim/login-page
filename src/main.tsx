import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Policy from './pages/Policy'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: 'policy',
    element: <Policy />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
