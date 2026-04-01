import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../authProvider/useAuth';

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};
