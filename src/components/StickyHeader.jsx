// components/StickyHeader.jsx
import { Layout, Menu, Badge, Dropdown, Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../store/useCart';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

const { Header } = Layout;

const StickyHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const cartQuantity = useCart((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        position: 'fixed',
        top: showHeader ? 0 : '-80px',
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'top 0.3s ease-in-out',
        background: '#001529',
        padding: '0 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <div style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>
          <NavLink to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Alfa Store
          </NavLink>
        </div>

        <Menu
          mode="horizontal"
          style={{
            background: 'transparent',
            border: 'none',
            minWidth: cartQuantity > 0 ? 230 : 185,
          }}
        >
          <Menu.Item key="home">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? '#ff9900' : 'white',
              })}
            >
              Home
            </NavLink>
          </Menu.Item>

          <Menu.Item key="cart">
            <NavLink
              to="/cart"
              style={({ isActive }) => ({
                color: isActive ? '#ff9900' : 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
              })}
            >
              <span>Cart</span>
              <Badge count={cartQuantity} overflowCount={99} offset={[4, -10]} />
            </NavLink>
          </Menu.Item>

          {!user ? (
          <>
            <Menu.Item key="login">
              <NavLink to="/login" style={{ color: 'white' }}>
                <LoginOutlined style={{ fontSize: '18px' }} />
              </NavLink>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="user">
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Button
                type="text"
                icon={<UserOutlined style={{ fontSize: '18px', color: 'white' }} />}
              />
            </Dropdown>
          </Menu.Item>
        )}
        </Menu>
      </div>
    </Header>
  );
};

export default StickyHeader;
