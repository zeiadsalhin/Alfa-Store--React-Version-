// src/pages/Signup.jsx
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const exists = users.find((u) => u.email === email);

      if (exists) {
        message.error('Email already registered!');
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { 
        id: Date.now(), 
        username, email, 
        password: hashedPassword, 
        role: 'admin', // default role 
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      message.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      message.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-28 flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2}>Create an Account</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
          <div className="mt-3 text-center">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
