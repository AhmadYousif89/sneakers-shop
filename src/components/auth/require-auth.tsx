import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store';

export const RequireAuth = () => {
  const location = useLocation();
  const user = useAuthStore(state => state.user);

  return user ? <Outlet /> : <Navigate to={'/auth'} state={{ from: location }} replace={true} />;
};
