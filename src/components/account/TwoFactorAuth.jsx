// components/account/TwoFactorAuth.jsx
import { Switch, Typography, Space } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

const TwoFactorAuth = () => {
  const [enabled, setEnabled] = useState(false);

  const toggle2FA = (checked) => {
    setEnabled(checked);
    // Add logic to enable/disable 2FA
  };

  return (
    <Space direction="vertical">
      <Text>Two-Factor Authentication adds an extra layer of security to your account.</Text>
      <Switch checked={enabled} onChange={toggle2FA} />
      <Text type="secondary">{enabled ? '2FA is enabled' : '2FA is disabled'}</Text>
    </Space>
  );
};

export default TwoFactorAuth;
