// src/pages/Login.jsx
import { Form, Input, Button, Card, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../utils/jwt'; // Import the JWT sign function

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formError, setFormError] = useState({ email: null, password: null });

  const onFinish = async ({ email, password }) => {
    setLoading(true);
    setFormError({ email: null, password: null }); // reset

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u) => u.email === email);

      if (!user) {
        setFormError({ email: 'No user found with this email.' });
        return;
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        setFormError({ password: 'Incorrect password. Please try again.' });
        return;
      }

      // Create JWT token for the user with a payload containing the necessary data
      const payload = user ;

      // Call the signJWT utility function to generate the JWT
      const token = await generateJWT(payload);

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the account page
      navigate('/account');
    } catch (error) {
      setFormError({ email: 'Something went wrong. Please try again.' });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div className="py-28 flex justify-center items-center bg-gray-100 px-5">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2}>Welcome Back</Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            validateStatus={formError.email ? 'error' : ''}
            help={formError.email}
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            validateStatus={formError.password ? 'error' : ''}
            help={formError.password}
            rules={[{ required: true }]}
          >
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
