import { Layout, List, Button, Space, Empty, Card, InputNumber, Select } from 'antd';
import { useCart } from '../store/useCart';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const { Content } = Layout;

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, updateOption } = useCart();
  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <>
      <Helmet>
        <title>Cart | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>

      <Layout style={{ width: '100%' }}>
        <Content className="p-4 flex flex-col w-full">
          <h1 className="text-xl font-semibold mb-4">Your Cart</h1>

          {cart.length === 0 ? (
            <Empty description="Your cart is empty" />
          ) : (
            <div className="w-full">
              <List
                dataSource={cart}
                itemLayout="horizontal"
                renderItem={(product) => (
                  <List.Item key={product.id} className="mb-4">
                    <Card className="w-full">
                      <div className="flex flex-cola sm:flex-row gap-6 items-center">
                        {/* Image */}
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-32 h-32 object-contain"
                        />

                        {/* Details */}
                        <div className="flex-1 w-full">
                          <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
                          <p className="text-gray-600 mb-2">${product.price}</p>

                          {/* Quantity and Options */}
                          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                            <Space>
                              <span>Quantity:</span>
                              <InputNumber
                                min={1}
                                defaultValue={product.quantity}
                                onChange={(value) => updateQuantity(product.id, value)}
                              />
                            </Space>

                            {product.options && (
                              <Select
                                defaultValue={product.selectedOption}
                                onChange={(value) => updateOption(product.id, value)}
                                style={{ minWidth: '150px' }}
                              >
                                {product.options.map((option, index) => (
                                  <Select.Option key={index} value={option}>
                                    {option}
                                  </Select.Option>
                                ))}
                              </Select>
                            )}
                          </div>

                          {/* Remove Button */}
                          <div className="mt-4">
                            <Button
                              type="link"
                              danger
                              onClick={() => removeFromCart(product.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />

              {/* Cart Total */}
              <Space
                style={{
                  marginTop: 20,
                  position: 'sticky',
                  bottom: 0,
                  backgroundColor: '#fff',
                  padding: '10px 0',
                  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                  width: '100%',
                }}
                direction="vertical"
                align="center"
              >
                <h3>Total: ${total.toFixed(2)}</h3>
                <Button danger onClick={clearCart} style={{ width: '100%' }}>
                  Clear Cart
                </Button>

                <Link to="/checkout" className="w-full block">
                <Button type="primary" className="bg-[#001529] text-white w-full">
                  Continue to Checkout
                </Button>
              </Link>
              </Space>
            </div>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default Cart;
