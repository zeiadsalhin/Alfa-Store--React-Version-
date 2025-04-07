// src/pages/Checkout.jsx
import { Layout, Form, Input, Select, Button, Card, Divider } from 'antd';
import { Helmet } from 'react-helmet';
import { useCart } from '../store/useCart';

const { Content } = Layout;
const { Option } = Select;

const Checkout = () => {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleFinish = (values) => {
    console.log('Checkout data:', values);
    alert('Order placed!');
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Alfa Store</title>
      </Helmet>

      <Layout className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Content className="w-full max-w-6xl p-4 sm:p-6 md:p-10">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10 w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

            <Form layout="vertical"
             onFinish={handleFinish}
             initialValues={{
                shipping: 'standard', // default shipping method
                payment: 'credit'      // default payment method
              }}
             >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping Info */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="City" name="city" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Shipping Method" name="shipping" rules={[{ required: true }]}>
                    <Select>
                      <Option value="standard">Standard (Free)</Option>
                      <Option value="express">Express ($10.00)</Option>
                    </Select>
                  </Form.Item>
                </div>

                {/* Payment Info */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Payment</h2>
                  <Form.Item label="Payment Method" name="payment" rules={[{ required: true }]}>
                    <Select>
                      <Option value="credit">Credit Card</Option>
                      <Option value="paypal">PayPal</Option>
                      <Option value="cash">Cash on Delivery</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Discount Code" name="coupon">
                    <Input placeholder="Enter code if any" />
                  </Form.Item>

                  <Divider />

                  <Card bordered className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                    <p>Items: {cart.length}</p>
                    <p className="mt-1">Total: <strong>${total.toFixed(2)}</strong></p>
                  </Card>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button type="primary" htmlType="submit" className="bg-[#001529] text-white px-10 h-12 text-base">
                  Place Order
                </Button>
              </div>
            </Form>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Checkout;
