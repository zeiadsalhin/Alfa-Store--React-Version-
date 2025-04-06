import { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');

  const handleSubmit = (values) => {
    setMessage('Thank you for reaching out! We will get back to you shortly.');
    form.resetFields();
  };

  return (
    <>
      <Helmet>
        <title>Contact | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>
    <div style={{ padding: '20px' }}>
      <h1 className='text-xl font-semibold py-1'>Contact Us</h1>
      <p>If you have any questions or concerns, feel free to reach out to us!</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: '600px', margin: '20px auto' }}
      >
        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Your Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Your Message"
          name="message"
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Send Message
        </Button>
      </Form>

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
    </div>
    </>
  );
};

export default Contact;
