// components/account/ChangeEmail.jsx
import { Form, Input, Button, message } from 'antd';

const ChangeEmail = () => {
  const onFinish = (values) => {
    // Replace with logic to change email
    console.log('New email:', values.email);
    message.success('Email updated!');
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="email" label="New Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">Update Email</Button>
    </Form>
  );
};

export default ChangeEmail;
