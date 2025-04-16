import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { verifyJWT } from '../utils/jwt'; // Import the verifyJWT utility

const AuthRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); // Track loading state for async token verification
  const [user, setUser] = useState(null);
  
  const token = localStorage.getItem('token'); // Get the token from localStorage

  useEffect(() => {
    const verifyUserToken = async () => {
      if (token) {
        const decodedUser = await verifyJWT(token); // Verify the JWT using the utility function
        if (decodedUser) {
          setUser(decodedUser); // Set the user state if the token is valid
          // console.log('User verified:', decodedUser); // Log the verified user
        }
      }
      setLoading(false); // Once verification is done, set loading to false
    };

    verifyUserToken();
  }, [token]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />; // If no valid user, redirect to login
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />; // If user is admin, redirect to admin dashboard
  }

  return children; // Otherwise, return the children components for non-admin users
};

export default AuthRoute;
