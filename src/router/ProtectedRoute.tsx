import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  allowNavigation?: boolean;
  children?: React.ReactNode;
  reRouteUrl: string;
  /**The reRoute function is used for handling situations like tokens. */
  allowNavigationFunc?: (searchUrl: string) => boolean;
}
export function ProtectedRoute({
  allowNavigation = true,
  children,
  reRouteUrl,
  allowNavigationFunc,
}: PrivateRouteProps) {
  const next = <>{children}</>;
  const location = useLocation();
  const reRoute = () => {
    return <Navigate to={reRouteUrl} />;
  };

  if (allowNavigationFunc) {
    if (allowNavigationFunc(location.search)) return next;

    return reRoute();
  }
  if (!allowNavigation) return reRoute();

  return next;
}
