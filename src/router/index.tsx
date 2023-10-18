import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { userIsLoggedIn } from './navigationGuards';

import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = lazy(() => import('../pages/app/DashboardPage'));
const TasksPage = lazy(() => import('../pages/app/TasksPage'));
const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute
        reRouteUrl="/auth/login"
        allowNavigation={userIsLoggedIn()}
      >
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>If an unhandled error occurs in a component or page, this is going to get triggered</div>,
    children: [
      {
        path: '/',
        element: <ProtectedRoute reRouteUrl='/tasks' allowNavigation={false}><DashboardPage /></ProtectedRoute>,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <ProtectedRoute reRouteUrl="/" allowNavigation={!userIsLoggedIn()}>
        <AuthLayout />
      </ProtectedRoute>
    ),
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
  {
    path: '*',
    // This route is the wildcard. Any route that does not exist would be redirected to this route. replace it with the design for your 404 page.
    element: <ProtectedRoute reRouteUrl='/tasks' allowNavigation={false} />
  }
]);
export default router;
