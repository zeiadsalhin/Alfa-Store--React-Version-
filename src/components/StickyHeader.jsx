import { Layout, Menu, Badge, Dropdown, Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../store/useCart';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Header } = Layout;

const StickyHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const cartQuantity = useCart((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

  const LogoSvg = () => (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="14" width="60" height="38" rx="6" ry="6" stroke="white" strokeWidth="4" fill="#001529"/>
      <path d="M10 24H54V40H10V24Z" fill="#ff9900" />
      <circle cx="20" cy="32" r="4" fill="white" />
      <circle cx="44" cy="32" r="4" fill="white" />
      <path d="M22 50L28 34H36L42 50" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
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
          <NavLink to="/" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            {isMobile ? <LogoSvg /> : 'Alfa Store'}
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
            <Menu.Item key="login">
              <NavLink to="/login" style={{ color: 'white' }}>
                <LoginOutlined style={{ fontSize: '18px' }} />
              </NavLink>
            </Menu.Item>
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
