import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { userIsLoggedIn } from './navigationGuards';

import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = lazy(() => import('../pages/app/DashboardPage'));
const TasksPage = lazy(() => import('../pages/app/TasksPage'));
const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const PageError = lazy(() => import('../components/errors/PageError'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    // Ignore the comment
    // element: (
    //   <ProtectedRoute
    //     reRouteUrl="/auth/login"
    //     allowNavigation={userIsLoggedIn()}
    //   >
    //     <DashboardLayout />
    //   </ProtectedRoute>
    // ),
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        element: <Navigate to="/tasks" replace />,
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
    // This route is the wildcard. Any route that does not exist would be redirected to this route. replace it with your 404 page.
    element: <Navigate to="/tasks" replace />,
  }
]);
export default router;
