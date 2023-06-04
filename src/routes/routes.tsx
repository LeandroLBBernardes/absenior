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
import { Profile } from '../pages/profile-page/index.js';
import { Settings } from '../pages/settings-page/index.js';
import { ChangePassword } from '../pages/change-password-page/index.js';
import { ConfirmEmailChange } from '../pages/profile-page/confirm-email-change-page/index.js';
import { MainMenu } from '../pages/menu/main-menu-page/index.js';

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
            <Route index element={<Resume  />} />

            <Route path="settings" element={<Settings />}>
              <Route index element={<Profile  />} />
              <Route path="password" element={<ChangePassword  />} />
            </Route>

            <Route path="menu">
              <Route index element={<MainMenu  />} />
            </Route>
          </Route>

          <Route path="confirmemailchange" element={<ProtectedRoute><ConfirmEmailChange /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
