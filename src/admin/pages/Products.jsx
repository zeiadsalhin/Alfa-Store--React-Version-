import { Card, Table, Button, Typography, Tag, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Products = () => {
  const [products, setProducts] = useState([
    {
      key: '1',
      name: 'Smartphone A10',
      price: '$199.99',
      stock: 25,
      category: 'Electronics',
      status: 'Active',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
    {
      key: '2',
      name: 'Leather Jacket',
      price: '$89.99',
      stock: 5,
      category: 'Clothing',
      status: 'Inactive',
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    },
  ]);

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
        <title>Products - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div className="p-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="!mb-0">Product Management</Title>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </div>
        <Table columns={columns} dataSource={products} />
      </Card>
    </div>
    </>
  );
};

export default Products;
