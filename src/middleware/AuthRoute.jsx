// src/middleware/AuthRoute.jsx
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('currentUser');

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
