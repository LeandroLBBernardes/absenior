import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../hooks/user-auth.js'
import { Login } from '../pages/login-page/index.js';
import { Main } from '../pages/main-page/index.js';
import { Register } from '../pages/register-page/index.js';
import { ErrorPage } from '../pages/error-page/index.js';
import { Home } from '../pages/home-page/index.js';
import ProtectedRoute from '../components/protected-route/index.js';
import { Resume } from '../pages/resume-page/index.js';
import { EmailResetPassword } from '../pages/email-reset-password-page/index.js';
import { ResetPassword } from '../pages/reset-password-page/index.js';

export function PublicRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login  />} />
          <Route path="emailresetpassword" element={<EmailResetPassword  />} />
          <Route path="resetpassword" element={<ResetPassword  />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route path='' element={<Resume  />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
