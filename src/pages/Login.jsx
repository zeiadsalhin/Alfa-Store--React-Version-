import Cookies from 'js-cookie';
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

      // Store token securely in a cookie
      Cookies.set('token', token, {
        secure: true, // only send over HTTPS
        sameSite: 'Strict', // CSRF protection
        expires: 7, // 7 day expiration
      });

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

      <div 
        className="py-28a flex justify-center items-center bg-cover bg-center"
        style={{ 
          height: 'calc(100vh - 6rem)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'540\' height=\'450\' viewBox=\'0 0 1080 900\'%3E%3Crect fill=\'%230C86FF\' width=\'1080\' height=\'900\'/%3E%3Cg fill-opacity=\'0.03\'%3E%3Cpolygon fill=\'%23444\' points=\'90 150 0 300 180 300\'/%3E%3Cpolygon points=\'90 150 180 0 0 0\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'270 150 360 0 180 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'450 150 360 300 540 300\'/%3E%3Cpolygon fill=\'%23999\' points=\'450 150 540 0 360 0\'/%3E%3Cpolygon points=\'630 150 540 300 720 300\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'630 150 720 0 540 0\'/%3E%3Cpolygon fill=\'%23444\' points=\'810 150 720 300 900 300\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'810 150 900 0 720 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'990 150 900 300 1080 300\'/%3E%3Cpolygon fill=\'%23444\' points=\'990 150 1080 0 900 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'90 450 0 600 180 600\'/%3E%3Cpolygon points=\'90 450 180 300 0 300\'/%3E%3Cpolygon fill=\'%23666\' points=\'270 450 180 600 360 600\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'270 450 360 300 180 300\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'450 450 360 600 540 600\'/%3E%3Cpolygon fill=\'%23999\' points=\'450 450 540 300 360 300\'/%3E%3Cpolygon fill=\'%23999\' points=\'630 450 540 600 720 600\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'630 450 720 300 540 300\'/%3E%3Cpolygon points=\'810 450 720 600 900 600\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'810 450 900 300 720 300\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'990 450 900 600 1080 600\'/%3E%3Cpolygon fill=\'%23444\' points=\'990 450 1080 300 900 300\'/%3E%3Cpolygon fill=\'%23222\' points=\'90 750 0 900 180 900\'/%3E%3Cpolygon points=\'270 750 180 900 360 900\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'270 750 360 600 180 600\'/%3E%3Cpolygon points=\'450 750 540 600 360 600\'/%3E%3Cpolygon points=\'630 750 540 900 720 900\'/%3E%3Cpolygon fill=\'%23444\' points=\'630 750 720 600 540 600\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'810 750 720 900 900 900\'/%3E%3Cpolygon fill=\'%23666\' points=\'810 750 900 600 720 600\'/%3E%3Cpolygon fill=\'%23999\' points=\'990 750 900 900 1080 900\'/%3E%3Cpolygon fill=\'%23999\' points=\'180 0 90 150 270 150\'/%3E%3Cpolygon fill=\'%23444\' points=\'360 0 270 150 450 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'540 0 450 150 630 150\'/%3E%3Cpolygon points=\'900 0 810 150 990 150\'/%3E%3Cpolygon fill=\'%23222\' points=\'0 300 -90 450 90 450\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'0 300 90 150 -90 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'180 300 90 450 270 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'180 300 270 150 90 150\'/%3E%3Cpolygon fill=\'%23222\' points=\'360 300 270 450 450 450\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'360 300 450 150 270 150\'/%3E%3Cpolygon fill=\'%23444\' points=\'540 300 450 450 630 450\'/%3E%3Cpolygon fill=\'%23222\' points=\'540 300 630 150 450 150\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'720 300 630 450 810 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'720 300 810 150 630 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'900 300 810 450 990 450\'/%3E%3Cpolygon fill=\'%23999\' points=\'900 300 990 150 810 150\'/%3E%3Cpolygon points=\'0 600 -90 750 90 750\'/%3E%3Cpolygon fill=\'%23666\' points=\'0 600 90 450 -90 450\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'180 600 90 750 270 750\'/%3E%3Cpolygon fill=\'%23444\' points=\'180 600 270 450 90 450\'/%3E%3Cpolygon fill=\'%23444\' points=\'360 600 270 750 450 750\'/%3E%3Cpolygon fill=\'%23999\' points=\'360 600 450 450 270 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'540 600 630 450 450 450\'/%3E%3Cpolygon fill=\'%23222\' points=\'720 600 630 750 810 750\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'900 600 810 750 990 750\'/%3E%3Cpolygon fill=\'%23222\' points=\'900 600 990 450 810 450\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'0 900 90 750 -90 750\'/%3E%3Cpolygon fill=\'%23444\' points=\'180 900 270 750 90 750\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'360 900 450 750 270 750\'/%3E%3Cpolygon fill=\'%23999\' points=\'540 900 630 750 450 750\'/%3E%3Cpolygon fill=\'%23666\' points=\'720 900 810 750 630 750\'/%3E%3Cpolygon fill=\'%23222\' points=\'900 900 990 750 810 750\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'1080 900 990 750 900 750\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}
      >
        <Card 
          className="login-form-card"
          style={{ width: 400, borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
        >
          <Title level={3}>Sign In</Title>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Form.Item 
              label="Email" 
              name="email" 
              rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please input a valid email!' }]} 
              validateStatus={formError.email && 'error'}
              help={formError.email}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              label="Password" 
              name="password" 
              rules={[{ required: true, message: 'Please input your password!' }]} 
              validateStatus={formError.password && 'error'}
              help={formError.password}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign In
              </Button>
            </Form.Item>
            <Form.Item>
            <div>
              Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
            </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
