import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import DashboardPage from '../pages/app/DashboardPage';
import AuthLayout from '../layouts/AuthLayout';

const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'join',
        element: <RegistrationPage />,
      },
    ],
  },
]);
export default router;
