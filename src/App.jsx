import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import StickyHeader from './components/StickyHeader';
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
import AuthRoute from './middleware/AuthRoute';
import GuestRoute from './middleware/GuestRoute';
import DashboardLayout from './admin/DashboardLayout';
import DashboardHome from './admin/pages/DashboardHome';
import Branches from './admin/pages/Branches';
import Managers from './admin/pages/Managers';
import Products from './admin/pages/Products';
import Orders from './admin/pages/Orders';
import Sales from './admin/pages/Sales';
import Users from './admin/pages/Users';

const { Content } = Layout;

const App = () => {
  return (
    <Router>
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
            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="branches" element={<Branches />} />
                <Route path="managers" element={<Managers />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="sales" element={<Sales />} />
                <Route path="users" element={<Users />} />
              </Route>

          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
