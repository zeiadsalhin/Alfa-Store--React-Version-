import { Card, Table, Button, Typography, Tag, Image, Spin, Modal, Form, Input, notification, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { verifyJWT } from '../../utils/jwt';

const { Title } = Typography;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = await verifyJWT(token);
        if (payload?.id) {
          setUserId(payload.id);
        }
      }
    };

    const savedProducts = localStorage.getItem('products');
    
    if (!savedProducts) {
      const defaultProducts = [
        {
          key: Date.now().toString(),
          name: 'Smartphone A10',
          price: '$199.99',
          stock: 25,
          category: 'Electronics',
          status: 'Active',
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        },
        {
          key: Date.now().toString(),
          name: 'Leather Jacket',
          price: '$89.99',
          stock: 5,
          category: 'Clothing',
          status: 'Inactive',
          image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    } else {
      setProducts(JSON.parse(savedProducts));
    }

    setLoading(false);
    initUser();
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const showAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    let updated;
    if (editingProduct) {
      updated = products.map((p) =>
        p.key === editingProduct.key ? { ...p, ...values } : p
      );
      notification.success({
        message: 'Product Updated',
        description: `The product "${values.name}" has been successfully updated.`,
      });
    } else {
      const newProduct = {
        key: Date.now().toString(),
        ...values,
      };
      updated = [...products, newProduct];
      notification.success({
        message: 'Product Added',
        description: `The product "${values.name}" has been successfully added.`,
      });
    }

    saveProducts(updated);
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleDelete = () => {
    const updated = products.filter((p) => p.key !== editingProduct.key);
    saveProducts(updated);
    notification.success({
      message: 'Product Deleted',
      description: `The product "${editingProduct.name}" has been successfully deleted.`,
    });
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (src) => <Image src={src} alt="product" width={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
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

  if (loading || !userId) {
    return (
      <div className="flex justify-center items-center p-4">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
      <div>
        <Card>
          <div className="justify-between items-center mb-4">
            <Title level={3}>Product Management</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
              Add Product
            </Button>
          </div>
          <Table 
            columns={columns} 
            dataSource={products} 
            scroll={{ x: 'max-content' }}
            rowKey="key" 
          />
        </Card>
      </div>

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please enter category' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}>
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            {editingProduct && (
              <Button
                type="danger"
                style={{ marginLeft: 10 }}
                onClick={handleDelete}
              >
                Delete Product
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Products;
