import { Card, Table, Button, Typography, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Managers = () => {
  const [managers, setManagers] = useState([
    {
      key: '1',
      name: 'Ahmed Hossam',
      email: 'ahmed.hossam@alfastore.com',
      branch: 'Cairo Branch',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Noura Khaled',
      email: 'noura.khaled@alfastore.com',
      branch: 'Alexandria Branch',
      status: 'Inactive',
    },
  ]);

  const columns = [
    {
      title: 'Manager Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
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
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  return (
    <>
    <Helmet>
        <title>Managers - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div className="p-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="!mb-0">Manager Management</Title>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Manager
          </Button>
        </div>
        <Table columns={columns} dataSource={managers} />
      </Card>
    </div>
    </>
  );
};

export default Managers;
