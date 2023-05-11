import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.scss'

import { Login } from './components/login/index.tsx'
import { Register } from './components/register/index.tsx'
import { ErrorPage } from './components/error-page/index.tsx'
import { SignIn } from './components/sign-in/index.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'signin',
        element: <SignIn />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
