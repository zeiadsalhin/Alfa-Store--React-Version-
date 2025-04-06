import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Layout, Menu, Badge } from 'antd'; // Import Badge
import { NavLink } from 'react-router-dom';
import ProductPage from './pages/ProductPage'; // Import ProductPage
import TermsOfService from './pages/TermsOfService'; // Import TermsOfService
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import PrivacyPolicy
import Contact from './pages/Contact'; // Import Contact
import Footer from './components/Footer';  // Import Footer component
import { useCart } from './store/useCart'; // Import useCart hook to get cart quantity

const { Header, Content } = Layout;

const App = () => {
  // Get the total quantity of items in the cart using useCart
  const cartQuantity = useCart((state) => state.cart.reduce((total, item) => total + item.quantity, 0));

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', minWidth: '99vw' }}>
        <Header style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            <div style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>
              <NavLink to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                Alfa Store
              </NavLink>
            </div>
            <Menu mode="horizontal" style={{ background: 'transparent', border: 'none' }}>
              <Menu.Item key="1">
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? '#ff9900' : 'white',
                  })}
                >
                  Home
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
              <NavLink
                to="/cart"
                style={({ isActive }) => ({
                  color: isActive ? '#ff9900' : 'white', // Apply color based on isActive
                  textDecoration: 'none', // Ensure no underline
                })}
              >Cart
                <Badge count={cartQuantity} offset={[5, -10]} />
              </NavLink>
            </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} /> {/* Route for ProductPage */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
