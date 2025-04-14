import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from '../admin/DashboardLayout';
import { verifyJWT } from '../utils/jwt'; // Import the verifyJWT utility

const AdminRoute = () => {
  const [loading, setLoading] = useState(true); // Loading state for async JWT verification
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  
  const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

  useEffect(() => {
    const verifyAdmin = async () => {
      if (token) {
        const decodedUser = await verifyJWT(token); // Verify JWT token

        // Check if the decoded user has 'admin' role
        if (decodedUser && decodedUser.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false); // If no token, user is not an admin
      }
      setLoading(false); // Set loading to false after verification
    };

    verifyAdmin();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // You can show a loader while verifying the token
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />; // Redirect if not admin
  }

  return <DashboardLayout />; // Allow access to admin routes if user is admin
};

export default AdminRoute;
