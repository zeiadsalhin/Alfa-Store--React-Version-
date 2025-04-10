// components/account/Orders.jsx
import { List, Typography } from 'antd';

const { Text } = Typography;

const Orders = () => {
  const orders = []; // Replace with real order data

  return orders.length === 0 ? (
    <Text type="secondary">You have no orders yet.</Text>
  ) : (
    <List
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <Text>Order #{order.id} — {order.date}</Text>
        </List.Item>
      )}
    />
  );
};

export default Orders;
