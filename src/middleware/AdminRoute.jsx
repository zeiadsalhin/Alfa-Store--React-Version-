// src/middleware/AdminRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  // Check if user exists and has role 'admin'
  const isAdmin = user && user.role === 'admin';

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;
