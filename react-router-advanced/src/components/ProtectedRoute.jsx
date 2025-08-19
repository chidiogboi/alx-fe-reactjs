import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;