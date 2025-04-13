import { Card, Table, Typography, Tag, Button } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      key: '1',
      orderId: 'ORD001',
      customer: 'John Doe',
      status: 'Delivered',
      total: '$120.00',
      date: '2025-04-10',
    },
    {
      key: '2',
      orderId: 'ORD002',
      customer: 'Alice Smith',
      status: 'Processing',
      total: '$85.50',
      date: '2025-04-09',
    },
  ]);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color =
          status === 'Delivered' ? 'green' :
          status === 'Processing' ? 'blue' : 'volcano';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link">View</Button>,
    },
  ];

  return (
    <>
    <Helmet>
        <title>Orders - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div className="p-4">
      <Card>
        <Title level={3}>Orders Management</Title>
        <Table columns={columns} dataSource={orders} />
      </Card>
    </div>
    </>
  );
};

export default Orders;
