// src/pages/Account.jsx
import { Collapse, Typography, Divider, Card, Space, Button } from 'antd';
import Orders from '../components/account/Orders';
import CartSection from '../components/account/CartSection';
import Favourites from '../components/account/Favourites';
import TwoFactorAuth from '../components/account/TwoFactorAuth';
import ChangeEmail from '../components/account/ChangeEmail';
import ChangePassword from '../components/account/ChangePassword';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>My Account | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>

      <div className="py-28 max-w-4xl mx-auto px-4">
        <Title level={2} className="text-center mb-6">My Account</Title>

        {/* User Info Card */}
        {user && (
          <Card className="mb-6">
            <Space direction="vertical" className="w-full">
              <Text strong>Username:</Text>
              <Text>{user.username}</Text>
              <Text strong>Email:</Text>
              <Text>{user.email}</Text>
              <Button danger onClick={handleSignOut}>
                    Logout
                  </Button>
            </Space>
          </Card>
        )}

        <Collapse accordion bordered>
          <Panel header="Orders" key="1">
            <Orders />
          </Panel>
          <Panel header="Cart" key="2">
            <CartSection />
          </Panel>
          <Panel header="Favourites" key="3">
            <Favourites />
          </Panel>
          <Panel header="Account Settings" key="4">
            <Divider orientation="left">Two-Factor Authentication</Divider>
            <TwoFactorAuth />

            <Divider orientation="left">Change Email</Divider>
            <ChangeEmail />

            <Divider orientation="left">Change Password</Divider>
            <ChangePassword />
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default Account;
