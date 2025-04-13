import { Card, Table, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Branches = () => {
  const [branches, setBranches] = useState([
    {
      key: '1',
      name: 'Cairo Branch',
      location: 'Cairo, Egypt',
      manager: 'Ahmed Hossam',
    },
    {
      key: '2',
      name: 'Alexandria Branch',
      location: 'Alexandria, Egypt',
      manager: 'Noura Khaled',
    },
  ]);

  const columns = [
    {
      title: 'Branch Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
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
        <title>Branches - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div className="p-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="!mb-0">Branch Management</Title>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Branch
          </Button>
        </div>
        <Table columns={columns} dataSource={branches} />
      </Card>
    </div>
    </>
  );
};

export default Branches;
