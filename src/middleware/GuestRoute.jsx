// src/middleware/GuestRoute.jsx
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const isAuthenticated = !!Cookies.get('token'); // Check if the user is authenticated by checking for a token in cookies
  // If the user is authenticated, redirect them to the account page
  return isAuthenticated ? <Navigate to="/account" replace /> : children;
};

export default GuestRoute;
