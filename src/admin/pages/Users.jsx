import { Card, Table, Typography, Tag, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Users = () => {
  const [users, setUsers] = useState([
    {
      key: '1',
      username: 'adminUser',
      email: 'admin@alfastore.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      key: '2',
      username: 'johnDoe',
      email: 'john@example.com',
      role: 'Customer',
      status: 'Inactive',
    },
  ]);

  const columns = [
    {
      title: 'Avatar',
      key: 'avatar',
      render: () => <Avatar icon={<UserOutlined />} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'gold' : 'blue'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link">Manage</Button>,
    },
  ];

  return (
    <>
    <Helmet>
        <title>Users - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div className="p-4">
      <Card>
        <Title level={3}>User Management</Title>
        <Table columns={columns} dataSource={users} />
      </Card>
    </div>
    </>
  );
};

export default Users;
