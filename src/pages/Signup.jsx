import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
            help={emailError ? emailError : null} // Display the custom email error here
            validateStatus={emailError ? 'error' : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
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
  );
};

export default Signup;
