import {
  Card,
  Table,
  Button,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Skeleton,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { verifyJWT } from '../../utils/jwt'; // Import the verifyJWT utility

const { Title } = Typography;
const { Option } = Select;

const Managers = () => {
  const [form] = Form.useForm();
  const [managers, setManagers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingManager, setEditingManager] = useState(null);
  const [userId, setUserId] = useState(null); // Store the user ID
  const [storageKey, setStorageKey] = useState(''); // Key for storing manager data

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = await verifyJWT(token);
        if (payload?.id) {
          setUserId(payload.id); // Set the user ID from the JWT token
        }
      }
    };
    initUser();
  }, []);

  useEffect(() => {
    if (userId) {
      const key = `managers_${userId}`;
      setStorageKey(key);

      const saved = localStorage.getItem(key);
      if (saved) {
        setManagers(JSON.parse(saved));
      } else {
        const initial = [
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
        ];
        setManagers(initial);
        localStorage.setItem(key, JSON.stringify(initial));
      }
    }
  }, [userId]); // Trigger effect when userId changes

  const saveManagers = (updated) => {
    setManagers(updated);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
  };

  const showAddModal = () => {
    setEditingManager(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingManager(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    if (editingManager) {
      const updated = managers.map((m) =>
        m.key === editingManager.key ? { ...m, ...values } : m
      );
      saveManagers(updated);
    } else {
      const newManager = {
        key: `${Date.now()}`,
        ...values,
      };
      saveManagers([...managers, newManager]);
    }
    setIsModalVisible(false);
    setEditingManager(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingManager(null);
    form.resetFields();
  };

  const handleDelete = () => {
    const updated = managers.filter((m) => m.key !== editingManager.key);
    saveManagers(updated);
    setIsModalVisible(false);
    setEditingManager(null);
    form.resetFields();
  };

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
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => showEditModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  if (!userId) 
    return (
    <div className="p-5">
      <Skeleton active />
    </div>
    );

  return (
    <>
      <Helmet>
        <title>Managers - Admin | Alfa Store</title>
        <meta
          name="description"
          content="Manage your Alfa Store account, orders, and preferences."
        />
      </Helmet>
      <div>
        <Card>
          <div className="justify-between items-center mb-4">
            <Title level={3}>Manager Management</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
              Add Manager
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={managers}
            scroll={{ x: 'max-content' }}
            rowKey="key"
          />
        </Card>
      </div>

      <Modal
        title={editingManager ? 'Edit Manager' : 'Add Manager'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item
            name="name"
            label="Manager Name"
            rules={[{ required: true, message: 'Please enter manager name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="branch"
            label="Branch"
            rules={[{ required: true, message: 'Please enter branch name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <div className="flex justify-between mt-6">
            <Button type="primary" htmlType="submit">
              {editingManager ? 'Update Manager' : 'Add Manager'}
            </Button>

            {editingManager && (
              <Button danger onClick={handleDelete}>
                Delete Manager
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Managers;
