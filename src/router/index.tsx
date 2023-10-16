import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import DashboardPage from '../pages/app/DashboardPage';
import AuthLayout from '../layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { userIsLoggedIn } from './navigationGuards';

const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute reRouteUrl='/auth/login' allowNavigation={userIsLoggedIn()}><DashboardPage /></ProtectedRoute>,
  },
  {
    path: '/auth',
    element: <ProtectedRoute reRouteUrl="/" allowNavigation={!userIsLoggedIn()}><AuthLayout /></ProtectedRoute>,
    children: [
      {
        path: 'join',
        element: <RegistrationPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
export default router;
