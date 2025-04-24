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

  // Watch for order existence and redirect if empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/', { replace: true }); // `replace` avoids adding it to history
    }
  }, [cart, navigate]);

  // Function to detect card type based on the number
  const detectCardType = (number) => {
    if (!number) return '';
  
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'MasterCard';
    if (number.startsWith('34') || number.startsWith('37')) return 'American Express';
  
    const discoverRegex = /^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/;
    if (discoverRegex.test(number)) return 'Discover';
  
    return 'Unknown';
  };  

  const handleFinish = (values) => {
    let detectedType = '';
    let cardNumber = '';
  
    if (paymentMethod === 'credit') {
      cardNumber = values.cardNumber.replace(/\D/g, '');
      detectedType = detectCardType(cardNumber);
  
      if (detectedType === 'Unknown') {
        form.setFields([
          {
            name: 'cardNumber',
            errors: ['Unknown card type. Please enter a valid card number.'],
          },
        ]);
        return;
      }
    }
  
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
                  {/* Payment Method accepted */}
                  <p>We accept:</p>
                  <div className="flex gap-4 mt-1 mb-4 max-w-[18rem] items-center">
                    {/* Visa */}
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Visa</title><path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/></svg>
                    {/* MasterCard */}
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>MasterCard</title><path d="M11.343 18.031c.058.049.12.098.181.146-1.177.783-2.59 1.238-4.107 1.238C3.32 19.416 0 16.096 0 12c0-4.095 3.32-7.416 7.416-7.416 1.518 0 2.931.456 4.105 1.238-.06.051-.12.098-.165.15C9.6 7.489 8.595 9.688 8.595 12c0 2.311 1.001 4.51 2.748 6.031zm5.241-13.447c-1.52 0-2.931.456-4.105 1.238.06.051.12.098.165.15C14.4 7.489 15.405 9.688 15.405 12c0 2.31-1.001 4.507-2.748 6.031-.058.049-.12.098-.181.146 1.177.783 2.588 1.238 4.107 1.238C20.68 19.416 24 16.096 24 12c0-4.094-3.32-7.416-7.416-7.416zM12 6.174c-.096.075-.189.15-.28.231C10.156 7.764 9.169 9.765 9.169 12c0 2.236.987 4.236 2.551 5.595.09.08.185.158.28.232.096-.074.189-.152.28-.232 1.563-1.359 2.551-3.359 2.551-5.595 0-2.235-.987-4.236-2.551-5.595-.09-.08-.184-.156-.28-.231z"/></svg>
                    {/* Amex */}
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>American Express</title><path d="M16.015 14.378c0-.32-.135-.496-.344-.622-.21-.12-.464-.135-.81-.135h-1.543v2.82h.675v-1.027h.72c.24 0 .39.024.478.125.12.13.104.38.104.55v.35h.66v-.555c-.002-.25-.017-.376-.108-.516-.06-.08-.18-.18-.33-.234l.02-.008c.18-.072.48-.297.48-.747zm-.87.407l-.028-.002c-.09.053-.195.058-.33.058h-.81v-.63h.824c.12 0 .24 0 .33.05.098.048.156.147.15.255 0 .12-.045.215-.134.27zM20.297 15.837H19v.6h1.304c.676 0 1.05-.278 1.05-.884 0-.28-.066-.448-.187-.582-.153-.133-.392-.193-.73-.207l-.376-.015c-.104 0-.18 0-.255-.03-.09-.03-.15-.105-.15-.21 0-.09.017-.166.09-.21.083-.046.177-.066.272-.06h1.23v-.602h-1.35c-.704 0-.958.437-.958.84 0 .9.776.855 1.407.87.104 0 .18.015.225.06.046.03.082.106.082.18 0 .077-.035.15-.08.18-.06.053-.15.07-.277.07zM0 0v10.096L.81 8.22h1.75l.225.464V8.22h2.043l.45 1.02.437-1.013h6.502c.295 0 .56.057.756.236v-.23h1.787v.23c.307-.17.686-.23 1.12-.23h2.606l.24.466v-.466h1.918l.254.465v-.466h1.858v3.948H20.87l-.36-.6v.585h-2.353l-.256-.63h-.583l-.27.614h-1.213c-.48 0-.84-.104-1.08-.24v.24h-2.89v-.884c0-.12-.03-.12-.105-.135h-.105v1.036H6.067v-.48l-.21.48H4.69l-.202-.48v.465H2.235l-.256-.624H1.4l-.256.624H0V24h23.786v-7.108c-.27.135-.613.18-.973.18H21.09v-.255c-.21.165-.57.255-.914.255H14.71v-.9c0-.12-.018-.12-.12-.12h-.075v1.022h-1.8v-1.066c-.298.136-.643.15-.928.136h-.214v.915h-2.18l-.54-.617-.57.6H4.742v-3.93h3.61l.518.602.554-.6h2.412c.28 0 .74.03.942.225v-.24h2.177c.202 0 .644.045.903.225v-.24h3.265v.24c.163-.164.508-.24.803-.24h1.89v.24c.194-.15.464-.24.84-.24h1.176V0H0zM21.156 14.955c.004.005.006.012.01.016.01.01.024.01.032.02l-.042-.035zM23.828 13.082h.065v.555h-.065zM23.865 15.03v-.005c-.03-.025-.046-.048-.075-.07-.15-.153-.39-.215-.764-.225l-.36-.012c-.12 0-.194-.007-.27-.03-.09-.03-.15-.105-.15-.21 0-.09.03-.16.09-.204.076-.045.15-.05.27-.05h1.223v-.588h-1.283c-.69 0-.96.437-.96.84 0 .9.78.855 1.41.87.104 0 .18.015.224.06.046.03.076.106.076.18 0 .07-.034.138-.09.18-.045.056-.136.07-.27.07h-1.288v.605h1.287c.42 0 .734-.118.9-.36h.03c.09-.134.135-.3.135-.523 0-.24-.045-.39-.135-.526zM18.597 14.208v-.583h-2.235V16.458h2.235v-.585h-1.57v-.57h1.533v-.584h-1.532v-.51M13.51 8.787h.685V11.6h-.684zM13.126 9.543l-.007.006c0-.314-.13-.5-.34-.624-.217-.125-.47-.135-.81-.135H10.43v2.82h.674v-1.034h.72c.24 0 .39.03.487.12.122.136.107.378.107.548v.354h.677v-.553c0-.25-.016-.375-.11-.516-.09-.107-.202-.19-.33-.237.172-.07.472-.3.472-.75zm-.855.396h-.015c-.09.054-.195.056-.33.056H11.1v-.623h.825c.12 0 .24.004.33.05.09.04.15.128.15.25s-.047.22-.134.266zM15.92 9.373h.632v-.6h-.644c-.464 0-.804.105-1.02.33-.286.3-.362.69-.362 1.11 0 .512.123.833.36 1.074.232.238.645.31.97.31h.78l.255-.627h1.39l.262.627h1.36v-2.11l1.272 2.11h.95l.002.002V8.786h-.684v1.963l-1.18-1.96h-1.02V11.4L18.11 8.744h-1.004l-.943 2.22h-.3c-.177 0-.362-.03-.468-.134-.125-.15-.186-.36-.186-.662 0-.285.08-.51.194-.63.133-.135.272-.165.516-.165zm1.668-.108l.464 1.118v.002h-.93l.466-1.12zM2.38 10.97l.254.628H4V9.393l.972 2.205h.584l.973-2.202.015 2.202h.69v-2.81H6.118l-.807 1.904-.876-1.905H3.343v2.663L2.205 8.787h-.997L.01 11.597h.72l.26-.626h1.39zm-.688-1.705l.46 1.118-.003.002h-.915l.457-1.12zM11.856 13.62H9.714l-.85.923-.825-.922H5.346v2.82H8l.855-.932.824.93h1.302v-.94h.838c.6 0 1.17-.164 1.17-.945l-.006-.003c0-.78-.598-.93-1.128-.93zM7.67 15.853l-.014-.002H6.02v-.557h1.47v-.574H6.02v-.51H7.7l.733.82-.764.824zm2.642.33l-1.03-1.147 1.03-1.108v2.253zm1.553-1.258h-.885v-.717h.885c.24 0 .42.098.42.344 0 .243-.15.372-.42.372zM9.967 9.373v-.586H7.73V11.6h2.237v-.58H8.4v-.564h1.527V9.88H8.4v-.507"/></svg>
                    {/* Discover */}
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discover</title><path d="M14.58 12a2.023 2.023 0 1 1-2.025-2.023h.002c1.118 0 2.023.906 2.023 2.023zm-5.2-2.001c-1.124 0-2.025.884-2.025 1.99 0 1.118.878 1.984 2.007 1.984.319 0 .593-.063.93-.221v-.873c-.296.297-.559.416-.895.416-.747 0-1.277-.542-1.277-1.312 0-.73.547-1.306 1.243-1.306.354 0 .622.126.93.428v-.873a1.898 1.898 0 0 0-.913-.233zm-3.352 1.545c-.445-.165-.576-.273-.576-.479 0-.239.233-.422.553-.422.222 0 .405.091.598.308l.388-.508a1.665 1.665 0 0 0-1.117-.422c-.673 0-1.186.467-1.186 1.089 0 .524.239.792.936 1.043.291.103.438.171.513.217a.456.456 0 0 1 .222.394c0 .308-.245.536-.576.536-.354 0-.639-.177-.809-.507l-.479.461c.342.502.752.724 1.317.724.771 0 1.311-.513 1.311-1.249-.002-.603-.252-.876-1.095-1.185zM24 10.3a.29.29 0 0 1-.288.291.29.29 0 0 1-.291-.291v-.003A.29.29 0 1 1 24 10.3zm-.059.001a.235.235 0 0 0-.231-.239.234.234 0 0 0-.232.239c0 .132.104.239.232.239a.235.235 0 0 0 .231-.239zM3.472 13.887h.742v-3.803h-.742v3.803zm12.702-1.248l-1.014-2.554h-.81l1.614 3.9h.399l1.643-3.9h-.804l-1.028 2.554zm2.166 1.248h2.104v-.644h-1.362v-1.027h1.312v-.644h-1.312v-.844h1.362v-.644H18.34v3.803zm5.409-3.557l.11.138h-.097l-.094-.13v.13h-.08v-.334h.107c.081 0 .126.036.126.103.001.046-.025.08-.072.093zm-.006-.092c0-.029-.021-.043-.06-.043h-.014v.087h.014c.039 0 .06-.014.06-.044zm-1.228 2.047l1.197 1.602H22.8l-1.027-1.528h-.097v1.528h-.741v-3.803h1.1c.855 0 1.346.411 1.346 1.123 0 .583-.308.965-.866 1.078zm.103-1.038c0-.37-.251-.563-.713-.563h-.228v1.152h.217c.473-.001.724-.207.724-.589zm-19.487.742a1.91 1.91 0 0 1-.69 1.46c-.365.303-.781.439-1.357.439H.001v-3.803H1.09c1.202 0 2.041.781 2.041 1.904zm-.764-.006c0-.364-.154-.718-.411-.947-.245-.222-.536-.308-1.015-.308H.742v2.515h.199c.479 0 .782-.092 1.015-.302.256-.228.411-.593.411-.958z"/></svg>
                    {/* PayPal */}
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>PayPal</title><path d="M7.016 19.198h-4.2a.562.562 0 0 1-.555-.65L5.093.584A.692.692 0 0 1 5.776 0h7.222c3.417 0 5.904 2.488 5.846 5.5-.006.25-.027.5-.066.747A6.794 6.794 0 0 1 12.071 12H8.743a.69.69 0 0 0-.682.583l-.325 2.056-.013.083-.692 4.39-.015.087zM19.79 6.142c-.01.087-.01.175-.023.261a7.76 7.76 0 0 1-7.695 6.598H9.007l-.283 1.795-.013.083-.692 4.39-.134.843-.014.088H6.86l-.497 3.15a.562.562 0 0 0 .555.65h3.612c.34 0 .63-.249.683-.585l.952-6.031a.692.692 0 0 1 .683-.584h2.126a6.793 6.793 0 0 0 6.707-5.752c.306-1.95-.466-3.744-1.89-4.906z"/></svg>
                    {/* Cash */}
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Cash App</title><path d="M23.59 3.475a5.1 5.1 0 00-3.05-3.05c-1.31-.42-2.5-.42-4.92-.42H8.36c-2.4 0-3.61 0-4.9.4a5.1 5.1 0 00-3.05 3.06C0 4.765 0 5.965 0 8.365v7.27c0 2.41 0 3.6.4 4.9a5.1 5.1 0 003.05 3.05c1.3.41 2.5.41 4.9.41h7.28c2.41 0 3.61 0 4.9-.4a5.1 5.1 0 003.06-3.06c.41-1.3.41-2.5.41-4.9v-7.25c0-2.41 0-3.61-.41-4.91zm-6.17 4.63l-.93.93a.5.5 0 01-.67.01 5 5 0 00-3.22-1.18c-.97 0-1.94.32-1.94 1.21 0 .9 1.04 1.2 2.24 1.65 2.1.7 3.84 1.58 3.84 3.64 0 2.24-1.74 3.78-4.58 3.95l-.26 1.2a.49.49 0 01-.48.39H9.63l-.09-.01a.5.5 0 01-.38-.59l.28-1.27a6.54 6.54 0 01-2.88-1.57v-.01a.48.48 0 010-.68l1-.97a.49.49 0 01.67 0c.91.86 2.13 1.34 3.39 1.32 1.3 0 2.17-.55 2.17-1.42 0-.87-.88-1.1-2.54-1.72-1.76-.63-3.43-1.52-3.43-3.6 0-2.42 2.01-3.6 4.39-3.71l.25-1.23a.48.48 0 01.48-.38h1.78l.1.01c.26.06.43.31.37.57l-.27 1.37c.9.3 1.75.77 2.48 1.39l.02.02c.19.2.19.5 0 .68z"/></svg>
                  </div>

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
                        minLength={16}
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
                        <p className="text-sm mb-4 -mt-4 ms-1">
                          {/* Detected Card Type:  */}
                          <strong>{cardType}</strong>
                        </p>
                      )}
                      <Form.Item label="Expiration Date (MM/YY)" name="expiry" rules={[{ required: true }]}>
                        <Input
                          placeholder="MM/YY"
                          maxLength={5}
                          minLength={5}
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
                          minLength={3}
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
                    <div className="my-4 flex flex-col items-center">
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
