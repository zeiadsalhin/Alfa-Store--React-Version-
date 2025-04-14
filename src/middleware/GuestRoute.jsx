// src/middleware/GuestRoute.jsx
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/account" replace /> : children;
};

export default GuestRoute;
