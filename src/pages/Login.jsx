// src/pages/Login.jsx
import { Form, Input, Button, Card, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // 🔧 Replace with your actual login logic or Supabase signIn
      console.log('Login Values:', values);
      alert('Logged in!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Login | Alfa Store</title>
      <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
    </Helmet>

    <div className="py-28 flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2}>Welcome Back</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>

          <div className="mt-3 text-center">
            Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </Form>
      </Card>
    </div>
    </>
  );
};

export default Login;
