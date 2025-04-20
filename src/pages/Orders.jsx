import { useEffect, useState } from 'react';
import { Layout, Card, Empty, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import { verifyJWT } from './../utils/jwt';

const { Content } = Layout;

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get the current user ID from token
  const getUserIdFromToken = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = await verifyJWT(token); // Decode the JWT token
        return decoded.id;
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = JSON.parse(localStorage.getItem('users_orders')) || [];
      const userId = await getUserIdFromToken();

      if (!userId) {
        setLoading(false);
        return;
      }

      // Filter orders that match the current user's id
      const filteredOrders = allOrders.filter(order => order.user_id === userId);

      setUserOrders(filteredOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Layout className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading your orders..." />
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders | Alfa Store</title>
      </Helmet>
      <Layout className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Content className="w-full max-w-6xl p-4 sm:p-6 md:p-10">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>

          {userOrders.length === 0 ? (
            <Empty description="No orders found" />
          ) : (
            userOrders.map(order => (
              <Card
                key={order.orderId}
                title={`Order ID: ${order.orderId}`}
                style={{ marginBottom: '1rem' }}
                variant='bordered'
              >
                <p><strong>Name:</strong> {order.order.name}</p>
                <p><strong>Address:</strong> {order.order.address}</p>
                <p><strong>City:</strong> {order.order.city}</p>
                <p><strong>Country:</strong> {order.order.country}</p>
                <p><strong>Payment Method:</strong> {order.order.payment} xx{order.order.lastFour}</p>
                <p><strong>Total:</strong> ${order.order.total.toFixed(2)}</p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  {order.order.cart.map((item, idx) => (
                    <div key={idx} className="mb-2">
                      <p><strong>Product:</strong> {item.title}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ${item.price}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}
        </Content>
      </Layout>
    </>
  );
};

export default Orders;
