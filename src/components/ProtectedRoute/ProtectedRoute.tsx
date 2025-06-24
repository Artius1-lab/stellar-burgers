import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuth: boolean;
  redirectTo: string;
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuth,
  redirectTo,
  children
}) => (isAuth ? <>{children}</> : <Navigate to={redirectTo} replace />);
