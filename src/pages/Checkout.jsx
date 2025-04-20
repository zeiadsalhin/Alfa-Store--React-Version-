// src/Pages/Checkout.jsx
import { useNavigate } from 'react-router-dom';
import { Layout, Form, Input, Select, Button, Card, Divider } from 'antd';
import { Helmet } from 'react-helmet';
import { useCart } from '../store/useCart';
import { useEffect, useState } from 'react';
import { CreditCardOutlined, PayCircleOutlined, DollarOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [form] = Form.useForm();
  const [shippingPrice, setShippingPrice] = useState(0);
  const [cardType, setCardType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);  // Loading state for the loader

  const baseTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = baseTotal + shippingPrice;

  const detectCardType = (number) => {
    if (!number) return '';

    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'MasterCard';
    if (number.startsWith('34') || number.startsWith('37')) return 'American Express';
    if (number.startsWith('6')) return 'Discover';
    return 'Unknown';
  };

  const handleFinish = (values) => {
    // console.log('Checkout data:', values);

    const cardNumber = values.cardNumber.replace(/\D/g, ''); // Get raw card number without any non-digit characters
    const lastFour = cardNumber.slice(-4); // Get the last 4 digits of the card number
    setLoading(true);  // Show loader while processing
    
    // Redirect to the confirmation page after order is placed
    setTimeout(() => {
      // console.log(lastFour);
      
      navigate('/confirmation', { state: { orderInfo: { ...values, cart, total: finalTotal, lastFour } } });
    }, 3000);  // Redirect after 3 seconds
  };

  // Update shipping price when shipping method changes
  useEffect(() => {
    const shipping = form.getFieldValue('shipping');
    if (shipping === 'express') {
      setShippingPrice(10);
    } else {
      setShippingPrice(0);
    }
  }, [form]);

  return (
    <>
      <Helmet>
        <title>Checkout | Alfa Store</title>
      </Helmet>
      <Layout className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Content className="w-full max-w-6xl p-4 sm:p-6 md:p-10">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10 w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
            {/* {loading ? (
              <div className="flex justify-center items-center h-96">
                <Spin size="large" tip="Processing your order..." />
              </div>
            ) : ( */}
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              disabled={loading} // Disable form when loading
              initialValues={{
                shipping: 'standard',
                payment: 'credit',
              }}
              onValuesChange={(changedValues) => {
                if (changedValues.shipping) {
                  setShippingPrice(changedValues.shipping === 'express' ? 10 : 0);
                }
                if (changedValues.payment) {
                  setPaymentMethod(changedValues.payment);
                }
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

                  {/* Dynamic payment method form */}
                  {paymentMethod === 'credit' && (
                    <>
                      <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true }]}>
                      <Input
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        prefix={<CreditCardOutlined />}
                        onChange={(e) => {
                          let rawValue = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
                          form.setFieldsValue({ cardNumber: rawValue }); // Update the form field value
                          setCardType(detectCardType(rawValue));
                        }}
                        value={form.getFieldValue('cardNumber')}
                      />
                      </Form.Item>
                      {cardType && (
                        <p className="text-sm mb-4">
                          Detected Card Type: <strong>{cardType}</strong>
                        </p>
                      )}
                      <Form.Item label="Expiration Date (MM/YY)" name="expiry" rules={[{ required: true }]}>
                        <Input
                          placeholder="MM/YY"
                          maxLength={5}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                            if (value.length >= 3) {
                              value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                            }
                            form.setFieldsValue({ expiry: value });
                          }}
                          value={form.getFieldValue('expiry')}
                        />
                      </Form.Item>
                      <Form.Item label="CVV" name="cvv" rules={[{ required: true }]}>
                        <Input
                          placeholder="CVV"
                          maxLength={3}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Only digits
                            form.setFieldsValue({ cvv: value });
                          }}
                          value={form.getFieldValue('cvv')}
                        />
                      </Form.Item>
                    </>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="mt-4 flex flex-col items-center">
                      <Button
                        type="primary"
                        icon={<PayCircleOutlined />}
                        className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                      >
                        Pay with PayPal
                      </Button>
                    </div>
                  )}

                  {paymentMethod === 'cash' && (
                    <div className="py-4 bg-gray-50 flex flex-col items-center">
                      <DollarOutlined className="text-4xl mb-2 text-green-500" />
                      <p className="text-green-700 font-semibold">
                        You will pay cash upon delivery.
                      </p>
                    </div>
                  )}

                  {/* Coupon */}
                  <Form.Item label="Discount Code" name="coupon">
                    <Input placeholder="Enter code if any" />
                  </Form.Item>

                  <Divider />

                  <Card bordered className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                    <p>Items: {cart.length}</p>
                    <p>Subtotal: ${baseTotal.toFixed(2)}</p>
                    <p>Shipping: ${shippingPrice.toFixed(2)}</p>
                    <Divider />
                    <p className="text-xl font-bold">Total: ${finalTotal.toFixed(2)}</p>
                  </Card>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#001529] text-white px-10 h-12 text-base"
                loading={loading} // Use loading state to show spinner
              >
                Place Order
              </Button>
              </div>
            </Form>
             {/* )} */}
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Checkout;
