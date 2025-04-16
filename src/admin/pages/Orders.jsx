import { Card, Table, Typography, Tag, Button, Modal } from 'antd';
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
      items: [
        { name: 'Smartphone A10', quantity: 1, price: '$199.99' },
        { name: 'Leather Jacket', quantity: 2, price: '$89.99' },
      ],
    },
    {
      key: '2',
      orderId: 'ORD002',
      customer: 'Alice Smith',
      status: 'Processing',
      total: '$85.50',
      date: '2025-04-09',
      items: [
        { name: 'Smartphone A10', quantity: 1, price: '$199.99' },
        { name: 'Headphones', quantity: 1, price: '$50.00' },
      ],
    },
    {
      key: '3',
      orderId: 'ORD003',
      customer: 'Bob Johnson',
      status: 'Shipped',
      total: '$230.00',
      date: '2025-04-08',
      items: [
        { name: 'Laptop X15', quantity: 1, price: '$1499.99' },
        { name: 'USB-C Cable', quantity: 2, price: '$12.99' },
      ],
    },
    {
      key: '4',
      orderId: 'ORD004',
      customer: 'Charlie Brown',
      status: 'Delivered',
      total: '$105.75',
      date: '2025-04-07',
      items: [
        { name: 'Wireless Mouse', quantity: 1, price: '$25.99' },
        { name: 'Keyboard Pro', quantity: 1, price: '$79.99' },
      ],
    },
    {
      key: '5',
      orderId: 'ORD005',
      customer: 'David Lee',
      status: 'Processing',
      total: '$150.50',
      date: '2025-04-06',
      items: [
        { name: 'Smartwatch B5', quantity: 1, price: '$199.99' },
        { name: 'Charging Dock', quantity: 1, price: '$49.99' },
      ],
    },
    {
      key: '6',
      orderId: 'ORD006',
      customer: 'Emma Davis',
      status: 'Shipped',
      total: '$500.00',
      date: '2025-04-05',
      items: [
        { name: 'Gaming Chair', quantity: 1, price: '$299.99' },
        { name: 'RGB Keyboard', quantity: 1, price: '$129.99' },
      ],
    },
    {
      key: '7',
      orderId: 'ORD007',
      customer: 'Frank Wilson',
      status: 'Delivered',
      total: '$60.00',
      date: '2025-04-04',
      items: [
        { name: 'T-shirt XL', quantity: 2, price: '$15.00' },
        { name: 'Socks', quantity: 1, price: '$10.00' },
      ],
    },
    {
      key: '8',
      orderId: 'ORD008',
      customer: 'Grace Miller',
      status: 'Processing',
      total: '$99.99',
      date: '2025-04-03',
      items: [
        { name: 'Bluetooth Earbuds', quantity: 1, price: '$99.99' },
      ],
    },
    {
      key: '9',
      orderId: 'ORD009',
      customer: 'Henry Clark',
      status: 'Shipped',
      total: '$250.00',
      date: '2025-04-02',
      items: [
        { name: 'LED TV 50"', quantity: 1, price: '$249.99' },
        { name: 'Wall Mount', quantity: 1, price: '$20.00' },
      ],
    },
    {
      key: '10',
      orderId: 'ORD010',
      customer: 'Isla Walker',
      status: 'Delivered',
      total: '$80.00',
      date: '2025-04-01',
      items: [
        { name: 'Camera Lens', quantity: 1, price: '$79.99' },
        { name: 'Memory Card', quantity: 1, price: '$25.00' },
      ],
    },
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      render: (_, record) => (
        <Button type="link" onClick={() => showOrderDetails(record)}>View</Button>
      ),
    },
  ];

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const paginationProps = {
    pageSize: 8, // Show 5 orders per page
    total: orders.length,
    showTotal: (total) => `Total ${total} orders`,
  };

  return (
    <>
      <Helmet>
        <title>Orders - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>

      <div>
        <Card>
          <Title level={3}>Orders Management</Title>
          <Table
            columns={columns}
            dataSource={orders}
            scroll={{ x: 'max-content' }}
            pagination={paginationProps}
          />
        </Card>
      </div>

      {/* Order Details Modal */}
      <Modal
        title={`Order Details - ${selectedOrder?.orderId}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        <p><strong>Customer:</strong> {selectedOrder?.customer}</p>
        <p><strong>Status:</strong> {selectedOrder?.status}</p>
        <p><strong>Total:</strong> {selectedOrder?.total}</p>
        <p><strong>Date:</strong> {selectedOrder?.date}</p>

        <Title level={4}>Items</Title>
        <Table
          dataSource={selectedOrder?.items}
          columns={[
            { title: 'Item Name', dataIndex: 'name', key: 'name' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
          ]}
          pagination={false}  // Disable pagination for items
          rowKey="name"
        />
      </Modal>
    </>
  );
};

export default Orders;
