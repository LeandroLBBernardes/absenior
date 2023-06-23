import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { lazy, Suspense } from 'react';
import { LoadingPage } from './pages/loading-page/index.js';
import { AuthProvider } from './hooks/user-auth.js';
import ActivityJogoCompletarFrase from './pages/menu/activity-page/activity-completar-frase/index.js';

const  Login  = lazy(() => import('./pages/login-page/index.js')); 
const  Main  = lazy(() => import('./pages/main-page/index.js')); 
const  Register  = lazy(() => import('./pages/register-page/index.js')); 
const  ErrorPage  = lazy(() => import('./pages/error-page/index.js')); 
const  Home  = lazy(() => import('./pages/home-page/index.js')); 
const  ProtectedRoute = lazy(() => import('./components/protected-route/index.js')); 
const  Resume  = lazy(() => import('./pages/resume-page/index.js')); 
const  EmailResetPassword  = lazy(() => import('./pages/email-reset-password-page/index.js')); 
const  ResetPassword  = lazy(() => import('./pages/reset-password-page/index.js')); 
const  Profile  = lazy(() => import('./pages/profile-page/index.js')); 
const  Settings  = lazy(() => import('./pages/settings-page/index.js')); 
const  ChangePassword  = lazy(() => import('./pages/change-password-page/index.js')); 
const  ConfirmEmailChange  = lazy(() => import('./pages/profile-page/confirm-email-change-page/index.js')); 
const  MainMenu  = lazy(() => import('./pages/menu/main-menu-page/index.js')); 
const  ProgressPage  = lazy(() => import('./pages/menu/progress-page/index.js')); 
const  ActivityPage  = lazy(() => import('./pages/menu/activity-page/index.js')); 
const  AchievementsPage  = lazy(() => import('./pages/menu/achievements-page/index.js')); 
const  ConstructionPage  = lazy(() => import('./pages/construction-page/index.js')); 
const  PraticePage  = lazy(() => import('./pages/menu/practice-page/index.js')); 
const  HomeWorkPage  = lazy(() => import('./pages/menu/homework-page/index.js')); 
const  AddTask  = lazy(() => import('./pages/menu/homework-page/add-task/index.js')); 
const  VisualizeTask  = lazy(() => import('./pages/menu/homework-page/visualize-task/index.js')); 
const  ActivityFormarPalavras  = lazy(() => import('./pages/menu/activity-page/activity-formar-palavras/index.js')); 
const  ActivityFormarSilabas  = lazy(() => import('./pages/menu/activity-page/activity-formar-silaba/index.js')); 
const  ActivityFormarFrases  = lazy(() => import('./pages/menu/activity-page/activity-formar-frases/index.js')); 
const  ActivityJogoAssociacao  = lazy(() => import('./pages/menu/activity-page/activity-jogo-associacao/index.js')); 
const  ActivityLigarImagens  = lazy(() => import('./pages/menu/activity-page/activity-ligar-imagens/index.js')); 

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Suspense fallback={<LoadingPage />}><Main /></Suspense>} />
          <Route path="register" element={<Suspense fallback={<LoadingPage />}><Register /></Suspense>} />
          <Route path="login" element={<Suspense fallback={<LoadingPage />}><Login  /></Suspense>} />
          <Route path="emailresetpassword" element={<Suspense fallback={<LoadingPage />}><EmailResetPassword  /></Suspense>} />
          <Route path="resetpassword" element={<Suspense fallback={<LoadingPage />}><ResetPassword  /></Suspense>} />
          <Route path="construction" element={<Suspense fallback={<LoadingPage />}><ConstructionPage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<LoadingPage />}><ErrorPage /></Suspense>} />

          <Route path="home" element={<Suspense fallback={<LoadingPage />}><ProtectedRoute><Home /></ProtectedRoute></Suspense>}>
            <Route index element={<Suspense fallback={<LoadingPage />}><Resume  /></Suspense>} />

            <Route path="settings" element={<Suspense fallback={<LoadingPage />}><Settings /></Suspense>}>
              <Route index element={<Suspense fallback={<LoadingPage />}><Profile  /></Suspense>} />
              <Route path="password" element={<Suspense fallback={<LoadingPage />}><ChangePassword  /></Suspense>} />
            </Route>

            <Route path="menu">
              <Route index element={<Suspense fallback={<LoadingPage />}><MainMenu  /></Suspense>} />
            </Route>

            <Route path="activity">
              <Route index element={<Suspense fallback={<LoadingPage />}><ActivityPage  /></Suspense>} />
              <Route path="formwords" element={<Suspense fallback={<LoadingPage />}><ActivityFormarPalavras /></Suspense>} />
              <Route path="formsyllables" element={<Suspense fallback={<LoadingPage />}><ActivityFormarSilabas /></Suspense>} />
              <Route path="formphrases" element={<Suspense fallback={<LoadingPage />}><ActivityFormarFrases /></Suspense>} />
              <Route path="association" element={<Suspense fallback={<LoadingPage />}><ActivityJogoAssociacao /></Suspense>} />
              <Route path="linkimage" element={<Suspense fallback={<LoadingPage />}><ActivityLigarImagens /></Suspense>} />
              <Route path="completephrase" element={<Suspense fallback={<LoadingPage />}><ActivityJogoCompletarFrase /></Suspense>} />
            </Route>

            <Route path="progress" element={<Suspense fallback={<LoadingPage />}><ProgressPage /></Suspense>} />
            <Route path="achievements" element={<Suspense fallback={<LoadingPage />}><AchievementsPage /></Suspense>} />
            <Route path="practice" element={<Suspense fallback={<LoadingPage />}><PraticePage /></Suspense>} />
            <Route path="homework" element={<Suspense fallback={<LoadingPage />}><HomeWorkPage /></Suspense>} />
            <Route path="addtask" element={<Suspense fallback={<LoadingPage />}><AddTask /></Suspense>} />
            <Route path="visualizehomework" element={<Suspense fallback={<LoadingPage />}><VisualizeTask /></Suspense>} />
          </Route>

          <Route path="confirmemailchange" element={<Suspense fallback={<LoadingPage />}><ProtectedRoute><ConfirmEmailChange /></ProtectedRoute></Suspense>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
