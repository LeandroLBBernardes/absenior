import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/user-auth.js'

import { Login } from '../components/login/index.js'
import { ErrorPage } from '../components/error-page/index.js'
import { Register } from '../components/register/index.js'
import { SignIn } from '../components/sign-in/index.js'

import { Home } from '../components/home-page/index.js'

export function PublicRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<SignIn  />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path='home' element={user ? <Home /> : <Navigate to="/" />}>
          <Route path='' element={<Login  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
