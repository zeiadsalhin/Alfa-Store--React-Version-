import { useEffect, useState, useRef } from 'react';
import { Card, Table, Typography, Select, Button, Modal, Tag, Divider } from 'antd';
import {QRCodeSVG} from 'qrcode.react';
import { generateOrderQRCodeData } from "../../utils/qrCodeData";
import ShippingQRCode from "../components/ShippingQRCode";
import { generateShippingLabelWithQRCode } from "../../utils/generateShippingLabelWithQRCode";
import { Helmet } from 'react-helmet';

const { Title } = Typography;
const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState("");
  const qrRef = useRef();

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('users_orders'));
    if (localOrders) {
      const normalizedOrders = Array.isArray(localOrders) ? localOrders : [localOrders];
      const mappedOrders = normalizedOrders.map((order, index) => ({
        key: String(index + 1),
        orderId: order.orderId || `ORD${index + 100}`,
        customer: order.order?.name || 'Unknown Customer',
        status: order.status || 'Processing',
        total: `$${order.order?.total || 0}`,
        date: new Date().toISOString().slice(0, 10),
        items: order.order?.cart.map(item => ({
          name: item.title,
          quantity: item.quantity,
          price: `$${item.price}`,
        })) || [],
      }));
      setOrders(mappedOrders);
    } else {
      setOrders(DEFAULT_ORDERS);
    }
  }, []);

  const DEFAULT_ORDERS = [
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
  ];

  const handlePrint = () => {
    generateShippingLabelWithQRCode(selectedOrder, qrRef);
  };

  // const handleStatusChange = (value, recordKey) => {
  //   const updatedOrders = orders.map(order => {
  //     if (order.key === recordKey) {
  //       return { ...order, status: value };
  //     }
  //     return order;
  //   });
  //   setOrders(updatedOrders);
  //   const usersOrders = updatedOrders.map(order => ({
  //     orderId: order.orderId,
  //     order: {
  //       name: order.customer,
  //       total: parseFloat(order.total.replace('$', '')),
  //       cart: order.items.map(item => ({
  //         title: item.name,
  //         price: parseFloat(item.price.replace('$', '')),
  //         quantity: item.quantity,
  //       })),
  //     },
  //     status: order.status,
  //   }));
  //   localStorage.setItem('users_orders', JSON.stringify(usersOrders));
  // };

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
        let color = "orange";
        if (status === "Shipped") {
          color = "blue";
        } else if (status === "Delivered") {
          color = "green";
        } else if (status === "Cancelled") {
          color = "red";
        }
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
    setStatus(order.status);  // Set the initial status for the modal
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleModalStatusChange = (value) => {
    setStatus(value);  // Update status when changed inside modal
  };

  const handleSaveStatus = () => {
    const updatedOrders = orders.map(order => {
      if (order.key === selectedOrder.key) {
        return { ...order, status: status };
      }
      return order;
    });
    setOrders(updatedOrders);
    const usersOrders = updatedOrders.map(order => ({
      orderId: order.orderId,
      order: {
        name: order.customer,
        total: parseFloat(order.total.replace('$', '')),
        cart: order.items.map(item => ({
          title: item.name,
          price: parseFloat(item.price.replace('$', '')),
          quantity: item.quantity,
        })),
      },
      status: order.status,
    }));
    localStorage.setItem('users_orders', JSON.stringify(usersOrders));
    setIsModalVisible(false);
  };

  const paginationProps = {
    pageSize: 8,
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

      <Modal
        title={`Order Details - ${selectedOrder?.orderId}`}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSaveStatus}>
            Save Status
          </Button>,
        ]}
        width={600}
      >
        {selectedOrder && (
          <>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p className='inline-block'><strong className='me-2'>Status:</strong></p>
            <Select
              value={status}
              onChange={handleModalStatusChange}
              style={{ width: 120 }}
            >
              <Option value="Processing">Processing</Option>
              <Option value="Shipped">Shipped</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
            <p><strong>Total:</strong> {selectedOrder.total}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>

            <Title level={4}>Items</Title>
            <Table
              dataSource={selectedOrder.items}
              columns={[
                { title: 'Item Name', dataIndex: 'name', key: 'name' },
                { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
                { title: 'Price', dataIndex: 'price', key: 'price' },
              ]}
              pagination={false}
              rowKey="name"
            />
          <div className="mt-4 text-center">
            {/* Container for the two QR codes */}
            <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-18 items-center">

              {/* QR Code 1 */}
              <div className="flex flex-col items-center text-center">
              <Title level={4}>Order QR Code</Title>
                <QRCodeSVG
                  value={generateOrderQRCodeData(selectedOrder).url}
                  size={160}
                  marginSize={2}
                  className="mx-auto my-auto"
                />
                <p className="text-xs text-gray-500 mt-4a mb-4a">
                  Scan to get full order details
                </p>
              </div>

              {/* QR Code 2 */}
              <div className="flex flex-col items-center text-center mt-6">
                <ShippingQRCode ref={qrRef} data={selectedOrder} />

                {/* Button to print shipping label */}
                <Button type="primary" onClick={handlePrint} className="my-4">
                  Print Shipping Label
                </Button>
              </div>
            </div>

            {/* Divider after button */}
            <Divider className="w-full my-4" />
          </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Orders;
