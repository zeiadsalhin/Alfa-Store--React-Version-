import { Card, Table, Typography, Tag, Button, Avatar, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

// Importing the customer data from src/data/customers.json
import customersData from '../../data/customers.json'; // Adjust the import path if needed

const { Title } = Typography;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Load customers from the imported JSON file
  useEffect(() => {
    setCustomers(customersData);
  }, []);

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
        <Tag color={role === 'Admin' ? 'gold' : 'blue'}>{role}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleManage(record)}>Manage</Button>
      ),
    },
  ];

  const paginationProps = {
    pageSize: 10, // Show 10 customers per page
    total: customers.length,
    showTotal: (total) => `Total ${total} customers`,
  };

  const handleManage = (customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
  };

  const handleModalOk = () => {
    // Update customer logic (save data to backend or local state)
    setIsModalVisible(false);
    // Optionally update the `customers` state with new data
  };

  return (
    <>
      <Helmet>
        <title>Customers - Admin | Alfa Store</title>
        <meta
          name="description"
          content="Manage your Alfa Store customer accounts and preferences."
        />
      </Helmet>

      <div>
        <Card>
          <Title level={3}>Customer Management</Title>
          <Table
            columns={columns}
            dataSource={customers}
            scroll={{ x: 'max-content' }}
            pagination={paginationProps}
          />
        </Card>
      </div>

      {/* Modal for managing a customer */}
      {selectedCustomer && (
        <Modal
          title={`Manage Customer - ${selectedCustomer.username}`}
          visible={isModalVisible}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
        >
          <Form>
            <Form.Item label="Username">
              <Input value={selectedCustomer.username} />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={selectedCustomer.email} />
            </Form.Item>
            <Form.Item label="Role">
              <Input value={selectedCustomer.role} />
            </Form.Item>
            <Form.Item label="Status">
              <Input value={selectedCustomer.status} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Customers;
