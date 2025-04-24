import { useEffect, useState } from 'react';
import { Card, Button, Typography, Row, Col, Descriptions } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import { useParams } from 'react-router-dom'; // Import useParams from React Router
import { verifyJWT } from '../utils/jwt'; // Adjust path as needed

const { Title } = Typography;

const OrderDetails = () => {
  const { token } = useParams(); // Use useParams to get token from the URL params
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    // Verify the JWT token to decode order data
    const fetchOrderDetails = async () => {
      try {
        const decodedOrder = await verifyJWT(token);
        if (decodedOrder) {
          setOrder(decodedOrder);
        } else {
          setOrderError('Invalid or expired link');
        }
      } catch (error) {
        setOrderError('Error decoding order data');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchOrderDetails();
    } else {
      setOrderError('No token provided');
      setIsLoading(false);
    }
  }, [token]);

  const handlePrint = () => {
    // Logic for printing order details (if needed)
    window.print();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (orderError) {
    return (
      <Card>
        <Title level={2}>Order Details</Title>
        <p>{orderError}</p>
      </Card>
    );
  }

  return (
    <Card title={`Order #${order.id}`} bordered={false}>
      <Row gutter={16}>
        <Col span={12}>
          <Descriptions title="Order Info" layout="vertical">
            <Descriptions.Item label="Customer Name">{order.customer}</Descriptions.Item>
            <Descriptions.Item label="Order Date">{order.date}</Descriptions.Item>
            <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
            <Descriptions.Item label="Total">{order.total}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions title="Items" layout="vertical">
            {order.items.map((item, index) => (
              <Descriptions.Item label={`Item ${index + 1}`} key={index}>
                {item.name} - ${item.price}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 32 }}>
        <Col span={12}>
          <Title level={4}>Order QR Code</Title>
          <QRCodeSVG value={window.location.href} size={160} marginSize={4} />
        </Col>

        <Col span={12}>
          <Button type="primary" onClick={handlePrint} style={{ marginTop: 24 }}>
            Print Order Details
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderDetails;
