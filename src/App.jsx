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
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
