import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Card, Divider, Spin, Alert } from 'antd';
import { Helmet } from 'react-helmet';
import { CreditCardOutlined } from '@ant-design/icons';  // Import the credit card icon
import Cookies from 'js-cookie';  // Import js-cookie to work with cookies
import { verifyJWT } from './../utils/jwt';
import { useCart } from './../store/useCart';

const { Content } = Layout;

const Confirmation = () => {
  const { state } = useLocation();  // Get the passed state from the navigation
  const { orderInfo } = state || {};  // Order info passed from the checkout page
  const clearCart = useCart((state) => state.clearCart);
  const navigate = useNavigate();  // Hook for navigation

  const [loading, setLoading] = useState(true);  // Loader state for confirming order
  const [orderConfirmed, setOrderConfirmed] = useState(false);  // State to control alert visibility

  // Function to decode the JWT token from cookies and get the user ID
  const getUserIdFromToken = async () => {
    const token = Cookies.get('token');  // Retrieve the JWT token from cookies
    if (token) {
      try {
        const decodedToken = await verifyJWT(token);  // Decode the JWT token
        // console.log(decodedToken);
        
        return decodedToken.id;  // Assuming the user ID is stored as 'id' in the token's payload
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
    return null;
  };
  
  useEffect(() => {
    if (!orderInfo) return;

    // Simulate a 3-second loading process before displaying the alert
    setTimeout( async () => {
      setLoading(false);
      setOrderConfirmed(true);

      // Get the user ID from the JWT token
      const userId = await getUserIdFromToken();
      if (!userId) {
        console.error('User not authenticated or token is invalid');
        return;
      }

      // Generate a random order ID to avoid duplicates for exact orders
      const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      // Construct the order object
      const orderDetails = {
        orderId,  // New random order ID
        user_id: userId,  // Get user_id from the JWT token
        order: {
          name: orderInfo.name,
          address: orderInfo.address,
          city: orderInfo.city,
          country: orderInfo.country,
          payment: orderInfo.payment,
          total: orderInfo.total,
          lastFour: orderInfo.lastFour,
          cart: orderInfo.cart,
        },
      };

      // Retrieve existing orders from localStorage
      const existingOrders = JSON.parse(localStorage.getItem('users_orders')) || [];

      // Check if the current order already exists (using user_id and order details comparison)
      const isOrderExists = existingOrders.some(order => order.user_id === userId && JSON.stringify(order.order) === JSON.stringify(orderDetails.order));

      if (!isOrderExists) {
        // Save the new order to localStorage if it's not already present
        existingOrders.push(orderDetails);
        localStorage.setItem('users_orders', JSON.stringify(existingOrders));
      }
        // Clear the cart after order confirmation
        clearCart();
      
      // Redirect to orders page after 3 seconds
      setTimeout(() => {
        navigate('/orders');
      }, 5000);  // 3 seconds delay before redirecting
    }, 3000);
  }, [orderInfo, navigate, clearCart]);

  // If order info is not available, show a message
  if (!orderInfo) {
    return (
      <Layout className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Content className="w-full max-w-6xl p-4 sm:p-6 md:p-10">
          <h2 className="text-center text-xl font-bold">Order could not be processed.</h2>
        </Content>
      </Layout>
    );
  }

  const { name, address, city, country, payment, total, lastFour, cart } = orderInfo;

  return (
    <>
      <Helmet>
        <title>Order Confirmation | Alfa Store</title>
      </Helmet>
      <Layout className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Content className="w-full max-w-6xl p-4 sm:p-6 md:p-10">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10 w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Order Confirmation</h1>

            {loading && (
              <div className="flex justify-center items-center h-32">
                <Spin size="large" tip="Confirming your order..." />
              </div>
            )}
                {orderConfirmed && (
                  <Alert
                    message="Order Placed Successfully!"
                    description="Your order has been confirmed. Thank you for shopping with us."
                    type="success"
                    showIcon
                  />
                )}

                <div className="mb-6 mt-3">
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Address:</strong> {address}</p>
                  <p><strong>City:</strong> {city}</p>
                  <p><strong>Country:</strong> {country}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                  {payment === 'credit' && (
                    <div>
                      <p><strong>Payment Method:</strong> Credit Card <CreditCardOutlined style={{ marginRight: 8 }} /></p>
                      <p><strong>Card Ending:</strong> XX {lastFour}</p>
                    </div>
                  )}
                  {payment === 'paypal' && (
                    <div>
                      <p><strong>Payment Method:</strong> PayPal</p>
                    </div>
                  )}
                  {payment === 'cash' && (
                    <div>
                      <p><strong>Payment Method:</strong> Cash on Delivery</p>
                    </div>
                  )}
                </div>

                <Card bordered className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                  <p><strong>Items Ordered:</strong> {cart.length}</p>
                  <p><strong>Total Price:</strong> ${total.toFixed(2)}</p>
                </Card>

                <Divider />        
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Confirmation;
