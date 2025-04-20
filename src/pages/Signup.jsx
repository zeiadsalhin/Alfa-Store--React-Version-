import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import bcrypt from 'bcryptjs';

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to manage the admin role selection
  const [emailError, setEmailError] = useState(""); // State to manage email error message

  const onFinish = async ({ username, email, password }) => {
    setLoading(true);
    try {
      // Retrieve users from localStorage, defaulting to an empty array if none exist
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if the email already exists (case-insensitive)
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (exists) {
        setEmailError('Email is already registered!'); // Set the error message
        return; // Stop further execution if email exists
      } else {
        setEmailError(''); // Clear the error message if email is unique
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user object
      const newUser = { 
        id: Date.now(), 
        username, 
        email, 
        password: hashedPassword, 
        role: isAdmin ? 'admin' : 'user', // Set the role based on the checkbox
      };

      // Add new user to the users array
      users.push(newUser);
      
      // Save the updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(users));

      message.success('Account created successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Signup error:', error);
      message.error('Something went wrong!');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
      <div 
      className="flex justify-center items-center bg-cover bg-center"
        style={{ 
          height: 'calc(100vh - 6rem)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'540\' height=\'450\' viewBox=\'0 0 1080 900\'%3E%3Crect fill=\'%230C86FF\' width=\'1080\' height=\'900\'/%3E%3Cg fill-opacity=\'0.03\'%3E%3Cpolygon fill=\'%23444\' points=\'90 150 0 300 180 300\'/%3E%3Cpolygon points=\'90 150 180 0 0 0\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'270 150 360 0 180 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'450 150 360 300 540 300\'/%3E%3Cpolygon fill=\'%23999\' points=\'450 150 540 0 360 0\'/%3E%3Cpolygon points=\'630 150 540 300 720 300\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'630 150 720 0 540 0\'/%3E%3Cpolygon fill=\'%23444\' points=\'810 150 720 300 900 300\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'810 150 900 0 720 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'990 150 900 300 1080 300\'/%3E%3Cpolygon fill=\'%23444\' points=\'990 150 1080 0 900 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'90 450 0 600 180 600\'/%3E%3Cpolygon points=\'90 450 180 300 0 300\'/%3E%3Cpolygon fill=\'%23666\' points=\'270 450 180 600 360 600\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'270 450 360 300 180 300\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'450 450 360 600 540 600\'/%3E%3Cpolygon fill=\'%23999\' points=\'450 450 540 300 360 300\'/%3E%3Cpolygon fill=\'%23999\' points=\'630 450 540 600 720 600\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'630 450 720 300 540 300\'/%3E%3Cpolygon points=\'810 450 720 600 900 600\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'810 450 900 300 720 300\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'990 450 900 600 1080 600\'/%3E%3Cpolygon fill=\'%23444\' points=\'990 450 1080 300 900 300\'/%3E%3Cpolygon fill=\'%23222\' points=\'90 750 0 900 180 900\'/%3E%3Cpolygon points=\'270 750 180 900 360 900\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'270 750 360 600 180 600\'/%3E%3Cpolygon points=\'450 750 540 600 360 600\'/%3E%3Cpolygon points=\'630 750 540 900 720 900\'/%3E%3Cpolygon fill=\'%23444\' points=\'630 750 720 600 540 600\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'810 750 720 900 900 900\'/%3E%3Cpolygon fill=\'%23666\' points=\'810 750 900 600 720 600\'/%3E%3Cpolygon fill=\'%23999\' points=\'990 750 900 900 1080 900\'/%3E%3Cpolygon fill=\'%23999\' points=\'180 0 90 150 270 150\'/%3E%3Cpolygon fill=\'%23444\' points=\'360 0 270 150 450 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'540 0 450 150 630 150\'/%3E%3Cpolygon points=\'900 0 810 150 990 150\'/%3E%3Cpolygon fill=\'%23222\' points=\'0 300 -90 450 90 450\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'0 300 90 150 -90 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'180 300 90 450 270 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'180 300 270 150 90 150\'/%3E%3Cpolygon fill=\'%23222\' points=\'360 300 270 450 450 450\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'360 300 450 150 270 150\'/%3E%3Cpolygon fill=\'%23444\' points=\'540 300 450 450 630 450\'/%3E%3Cpolygon fill=\'%23222\' points=\'540 300 630 150 450 150\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'720 300 630 450 810 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'720 300 810 150 630 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'900 300 810 450 990 450\'/%3E%3Cpolygon fill=\'%23999\' points=\'900 300 990 150 810 150\'/%3E%3Cpolygon points=\'0 600 -90 750 90 750\'/%3E%3Cpolygon fill=\'%23666\' points=\'0 600 90 450 -90 450\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'180 600 90 750 270 750\'/%3E%3Cpolygon fill=\'%23444\' points=\'180 600 270 450 90 450\'/%3E%3Cpolygon fill=\'%23444\' points=\'360 600 270 750 450 750\'/%3E%3Cpolygon fill=\'%23999\' points=\'360 600 450 450 270 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'540 600 630 450 450 450\'/%3E%3Cpolygon fill=\'%23222\' points=\'720 600 630 750 810 750\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'900 600 810 750 990 750\'/%3E%3Cpolygon fill=\'%23222\' points=\'900 600 990 450 810 450\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'0 900 90 750 -90 750\'/%3E%3Cpolygon fill=\'%23444\' points=\'180 900 270 750 90 750\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'360 900 450 750 270 750\'/%3E%3Cpolygon fill=\'%23999\' points=\'540 900 630 750 450 750\'/%3E%3Cpolygon fill=\'%23666\' points=\'720 900 810 750 630 750\'/%3E%3Cpolygon fill=\'%23222\' points=\'900 900 990 750 810 750\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'1080 900 990 750 900 750\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}>

      <Card style={{ width: 400, borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2}>Create an Account</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
            help={emailError ? emailError : null} // Display the custom email error here
            validateStatus={emailError ? 'error' : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { 
                required: true, 
                min: 8, 
                message: 'Password must be at least 8 characters' 
              },
              { 
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, 
                message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          
          {/* Checkbox to select Admin role */}
          <Form.Item name="isAdmin" valuePropName="checked">
            <Checkbox onChange={(e) => setIsAdmin(e.target.checked)}>
              Sign up as Admin
            </Checkbox>
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
