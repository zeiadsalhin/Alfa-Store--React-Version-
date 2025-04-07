// src/pages/Signup.jsx
import { Form, Input, Button, Card, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // 🔧 Replace with your own signup logic or Supabase auth
      console.log('Sign Up Values:', values);
      alert('Account created!');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>

    <div className="py-28 flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2}>Create an Account</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirm" dependencies={['password']} hasFeedback rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
              },
            }),
          ]}>
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
    </>
  );
};

export default Signup;
