import { useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import StickyHeader from './components/StickyHeader';
// import useScrollToTop from './hooks/useScrollToTop'; // Adjust the path based on where you save the hook
import Cart from './pages/Cart';
import { Layout } from 'antd'; // Import Badge
import ProductPage from './pages/ProductPage'; // Import ProductPage
import TermsOfService from './pages/TermsOfService'; // Import TermsOfService
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import PrivacyPolicy
import Contact from './pages/Contact'; // Import Contact
import Footer from './components/Footer';  // Import Footer component
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import PageNotFound from './pages/PageNotFound';
import AuthRoute from './middleware/AuthRoute';
import GuestRoute from './middleware/GuestRoute';
import AdminRoute from './middleware/AdminRoute';
import Unauthorized from './pages/Unauthorized'; // Unauthorized page
import DashboardHome from './admin/pages/DashboardHome';
import Branches from './admin/pages/Branches';
import Managers from './admin/pages/Managers';
import Products from './admin/pages/Products';
import Orders from './admin/pages/Orders';
import Sales from './admin/pages/Sales';
import Users from './admin/pages/Users';

const { Content } = Layout;

// It scrolls to the top of the page whenever the route changes
const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });    
  }, [location.pathname]);

  return children;
};

const App = () => {
  return (
    <Router>
      <Wrapper>

      <Layout style={{ minHeight: '100vh', minWidth: '99vw', marginTop: "3.5rem" }}>
        
        <StickyHeader />

        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Protected Route */}
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
            {/* Protected Route */}
            <Route
              path="/account"
              element={
                <AuthRoute>
                  <Account />
                </AuthRoute>
              }
            />
            {/* Unauthorized Page */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<DashboardHome />} />
                <Route path="branches" element={<Branches />} />
                <Route path="managers" element={<Managers />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="sales" element={<Sales />} />
                <Route path="users" element={<Users />} />
              </Route>
            {/* Page Not Found (Wildcard Route) */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
      </Wrapper>
    </Router>
  );
};

export default App;
