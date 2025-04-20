import Cookies from 'js-cookie';
import { Card, Table, Button, Typography, Modal, Input, Form, Empty, Skeleton  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { verifyJWT } from '../../utils/jwt';

const { Title } = Typography;

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const initUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        const payload = await verifyJWT(token);
        if (payload?.id) {
          setUserId(payload.id);
        }
      }
    };
    initUser();
  }, []);

  const STORAGE_KEY = userId ? `branches_${userId}` : null;

  useEffect(() => {
    if (!STORAGE_KEY) return;
  
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBranches(JSON.parse(stored));
    } else {
      const defaultBranches = [
        {
          key: '1',
          name: 'Cairo Branch',
          location: 'Nasr City, Cairo',
          manager: 'Ahmed Hossam',
        },
        {
          key: '2',
          name: 'Alexandria Branch',
          location: 'Stanley, Alexandria',
          manager: 'Noura Khaled',
        },
      ];
      setBranches(defaultBranches);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBranches));
    }
  }, [STORAGE_KEY]);
  

  const saveBranches = (updated) => {
    setBranches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const showAddModal = () => {
    setEditingBranch(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (branch) => {
    setEditingBranch(branch);
    form.setFieldsValue(branch);
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    if (editingBranch) {
      const updated = branches.map((branch) =>
        branch.key === editingBranch.key ? { ...branch, ...values } : branch
      );
      saveBranches(updated);
    } else {
      const newBranch = {
        key: `${Date.now()}`,
        ...values,
      };
      saveBranches([...branches, newBranch]);
    }
    form.resetFields();
    setIsModalVisible(false);
    setEditingBranch(null);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingBranch(null);
  };

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
        <title>Branches - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>

      <div>
        <Card>
          <div className="justify-between items-center mb-4">
            <Title level={3}>
              Branch Management
            </Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
              Add Branch
            </Button>
          </div>

          {branches.length > 0 ? (
            <Table
              columns={columns}
              dataSource={branches}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          ) : (
            <Empty
              description="No branches found"
              className="my-12"
            />
          )}
        </Card>
      </div>

      <Modal
        title={editingBranch ? 'Edit Branch' : 'Add Branch'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleOk}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Branch Name"
            rules={[{ required: true, message: 'Please input the branch name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please input the location!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="manager"
            label="Manager"
            rules={[{ required: true, message: 'Please input the manager name!' }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-between mt-6">
            <Button type="primary" htmlType="submit">
              {editingBranch ? 'Update Branch' : 'Add Branch'}
            </Button>

            {editingBranch && (
              <Button
                danger
                onClick={() => {
                  const updated = branches.filter(b => b.key !== editingBranch.key);
                  saveBranches(updated);
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingBranch(null);
                }}
              >
                Delete Branch
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Branches;
