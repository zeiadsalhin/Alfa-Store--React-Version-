// components/StickyHeader.jsx
import { Layout, Menu, Badge } from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../store/useCart';

const { Header } = Layout;

const StickyHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // Get the total quantity of items in the cart using useCart
  const cartQuantity = useCart((state) => state.cart.reduce((total, item) => total + item.quantity, 0));
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowHeader(true); // scrolling up
      } else {
        setShowHeader(false); // scrolling down
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

    
  return (
    <Header
      style={{
        position: 'fixed',
        top: showHeader ? 0 : '-80px', // hide by moving it off screen
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'top 0.3s ease-in-out',
        background: '#001529',
        padding: '0 20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <div style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>
          <NavLink to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Alfa Store
          </NavLink>
        </div>

        <Menu mode="horizontal" style={{ background: 'transparent', border: 'none', minWidth: cartQuantity > 0 ? 170: 130 }}>
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

          <Menu.Item key="2" 
          // style={{ minWidth: cartQuantity > 0 ? 98 : 62 }}
          >
            <NavLink
              to="/cart"
              style={({ isActive }) => ({
                color: isActive ? '#ff9900' : 'white',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: 0,
              })}
            >
              <span>Cart</span>
              <Badge count={cartQuantity} overflowCount={99} offset={[4, -10]} />
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default StickyHeader;
