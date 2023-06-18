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
import { ProgressPage } from '../pages/menu/progress-page/index.js';
import { ActivityPage } from '../pages/menu/activity-page/index.js';
import { AchievementsPage } from '../pages/menu/achievements-page/index.js';
import { ConstructionPage } from '../pages/construction-page/index.js';
import { PraticePage } from '../pages/menu/practice-page/index.js';
import { HomeWorkPage } from '../pages/menu/homework-page/index.js';
import { AddTask } from '../pages/menu/homework-page/add-task/index.js';
import { VisualizeTask } from '../pages/menu/homework-page/visualize-task/index.js';
import { ActivityFormarPalavras } from '../pages/menu/activity-page/activity-formar-palavras/index.js';
import { ActivityFormarSilabas } from '../pages/menu/activity-page/activity-formar-silaba/index.js';
import { ActivityFormarFrases } from '../pages/menu/activity-page/activity-formar-frases/index.js';
import { ActivityJogoAssociacao } from '../pages/menu/activity-page/activity-jogo-associacao/index.js';

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
          <Route path="construction" element={<ConstructionPage />} />
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

            <Route path="activity">
              <Route index element={<ActivityPage  />} />
              <Route path="formwords" element={<ActivityFormarPalavras />} />
              <Route path="formsyllables" element={<ActivityFormarSilabas />} />
              <Route path="formphrases" element={<ActivityFormarFrases />} />
              <Route path="association" element={<ActivityJogoAssociacao />} />
            </Route>

            <Route path="progress" element={<ProgressPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="practice" element={<PraticePage />} />
            <Route path="homework" element={<HomeWorkPage />} />
            <Route path="addtask" element={<AddTask />} />
            <Route path="visualizehomework" element={<VisualizeTask />} />
          </Route>

          <Route path="confirmemailchange" element={<ProtectedRoute><ConfirmEmailChange /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
