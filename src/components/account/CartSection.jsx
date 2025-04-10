// components/account/CartSection.jsx
import { List, Typography } from 'antd';
import { useCart } from '../../store/useCart';

const { Text } = Typography;

const CartSection = () => {
  const cart = useCart((state) => state.cart);

  return cart.length === 0 ? (
    <Text type="secondary">Your cart is empty.</Text>
  ) : (
    <List
      dataSource={cart}
      renderItem={(item) => (
        <List.Item>
          <Text>{item.title} — Qty: {item.quantity}</Text>
        </List.Item>
      )}
    />
  );
};

export default CartSection;
