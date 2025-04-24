import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { Button, Card, Col, Row, Spin, Alert, Divider, Typography, Avatar, Rate } from 'antd';
import { UserOutlined, SettingOutlined, StarFilled } from '@ant-design/icons';
import useNotify from '../hooks/useNotify'; // Adjust path as needed
import { Helmet } from 'react-helmet';

const { Title, Text, Paragraph } = Typography;

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { notify, contextHolder } = useNotify();  // Destructure notify and contextHolder

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Trigger notification only when the product is added to the cart
  const handleAddToCart = (product) => {
    addToCart(product);
    notify('success', 'Added to Cart', `${product.title} has been added to your cart.`, 1.5);
  };
  

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" showIcon style={{ marginTop: '20%' }} />;
  }

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Helmet>
        <title>{product.title} | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>

      {/* Notification component to show notifications */}
      {contextHolder}

      {/* <NotificationContextHolder /> */}
      <div style={{ padding: '2rem' }}>
        <Row gutter={[32, 32]} align="top">
          {/* Left Column: Product Image */}
          <Col xs={24} md={10} lg={8}>
            <Card
              cover={
                <img
                  alt={product.title}
                  src={product.image}
                  style={{
                    objectFit: 'contain',
                    padding: '2rem',
                    height: '100%',
                    maxHeight: '30rem',
                  }}
                />
              }
              bordered={false}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </Col>

          {/* Right Column: Product Details */}
          <Col xs={24} md={14} lg={16}>
            <Typography>
              <Title level={3}>{product.title}</Title>
              <Text type="secondary" style={{ fontSize: '1.2rem' }}>
                ${product.price}
              </Text>
              <Paragraph style={{ marginTop: '1rem' }}>{product.description}</Paragraph>

              <Button
                type="primary"
                size="large"
                onClick={() => handleAddToCart(product)}
                style={{ marginTop: '1.5rem', backgroundColor: '#1890ff' }}
              >
                Add to Cart
              </Button>
            </Typography>

            <Divider />

          {/* About Section */}
            <div style={{ marginTop: '3rem' }}>
              <Title level={3}>About This Item</Title>

              <Row gutter={[24, 24]} style={{ marginTop: '1.5rem' }}>
                {/* Left Column: Seller + Specs */}
                <Col xs={24} md={12}>
                  <Card bordered style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Title level={5}><UserOutlined style={{ marginRight: 8 }} /> Sold By</Title>
                    <Text>Alfa Official Store</Text>
                    <Divider />
                    <Title level={5}><SettingOutlined style={{ marginRight: 8 }} /> Specifications</Title>
                    <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
                      <li><Text>Material: Premium Synthetic Blend</Text></li>
                      <li><Text>Dimensions: 12&quot; x 8&quot; x 6&quot;</Text></li>
                      <li><Text>Weight: 1.2kg</Text></li>
                      <li><Text>Warranty: 1-Year Manufacturer Warranty</Text></li>
                      <li><Text>Origin: Made in Egypt</Text></li>
                    </ul>
                  </Card>
                </Col>

                {/* Right Column: Customer Reviews */}
                <Col xs={24} md={12}>
                  <Card bordered style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Title level={5}><StarFilled style={{ color: '#fadb14', marginRight: 8 }} /> Customer Reviews</Title>

                    {[{
                      name: "Sarah M.",
                      review: "Amazing quality, totally exceeded my expectations.",
                      rating: 5
                    }, {
                      name: "Ahmed R.",
                      review: "Delivered on time. Great value for the price.",
                      rating: 4
                    }, {
                      name: "John K.",
                      review: "Item is good but packaging could improve.",
                      rating: 3
                    }].map((rev, i) => (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar style={{ backgroundColor: '#1890ff' }}>{rev.name.charAt(0)}</Avatar>
                          <div>
                            <Text strong>{rev.name}</Text>
                            <Rate disabled defaultValue={rev.rating} style={{ fontSize: 14, marginLeft: 8 }} />
                          </div>
                        </div>
                        <Paragraph style={{ marginTop: 4 }}>{rev.review}</Paragraph>
                      </div>
                    ))}
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductPage;
