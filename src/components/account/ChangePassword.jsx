// components/account/ChangePassword.jsx
import { Form, Input, Button, message } from 'antd';

const ChangePassword = () => {
  const onFinish = (values) => {
    if (values.new !== values.confirm) {
      return message.error('Passwords do not match!');
    }

    // Replace with logic to update password
    console.log('New password:', values.new);
    message.success('Password updated!');
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="new" label="New Password" rules={[{ required: true, min: 6 }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="confirm" label="Confirm Password" dependencies={['new']} hasFeedback>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">Change Password</Button>
    </Form>
  );
};

export default ChangePassword;
