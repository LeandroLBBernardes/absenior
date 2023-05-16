import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/user-auth.js'
import { Login } from '../pages/login-page/index.js';
import { Main } from '../pages/main-page/index.js';
import { Register } from '../pages/register-page/index.js';
import { ErrorPage } from '../pages/error-page/index.js';
import { Home } from '../pages/home-page/index.js';



export function PublicRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login  />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path='home' element={user ? <Home /> : <Navigate to="/" />}>
          <Route path='' element={<Login  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
