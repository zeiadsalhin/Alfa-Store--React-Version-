// src/pages/Cart.jsx
import { Layout, List, Button, Space, Empty, Card, InputNumber, Select } from 'antd';
import { useCart } from '../store/useCart';
import { Helmet } from 'react-helmet';

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
      <Content style={{ padding: '50px', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <h1 className='text-xl font-semibold mb-4'>Your Cart</h1>

        {cart.length === 0 ? (
          <Empty description="Your cart is empty" />
        ) : (
          <div style={{ flex: 1, overflowY: 'no', width: '100%' }}>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
              dataSource={cart}
              renderItem={(product) => (
                <List.Item key={product.id} style={{ width: '24rem' }}>  
                  <Card
                    hoverable
                    cover={<img alt={product.title} src={product.image} style={{ height: '200px',width: '100%', objectFit: 'contain' }} />}
                    actions={[
                      <Button
                        key={product.id}
                        type="link"
                        danger
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </Button>
                    ]}
                  >
                    <Card.Meta title={product.title} description={`$${product.price}`} />

                    <div style={{ marginTop: '10px' }}>
                      {/* Quantity Selector */}
                      <Space>
                        <span>Quantity:</span>
                        <InputNumber
                          min={1}
                          defaultValue={product.quantity}
                          onChange={(value) => updateQuantity(product.id, value)}
                        />
                      </Space>

                      {/* Options */}
                      {product.options && (
                        <div style={{ marginTop: '10px' }}>
                          <Select
                            defaultValue={product.selectedOption}
                            onChange={(value) => updateOption(product.id, value)}
                            style={{ width: '100%' }}
                          >
                            {product.options.map((option, index) => (
                              <Select.Option key={index} value={option}>
                                {option}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        )}

        {/* Cart details and clear button at the bottom */}
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
        </Space>
      </Content>
    </Layout>
    </>
  );
};

export default Cart;
