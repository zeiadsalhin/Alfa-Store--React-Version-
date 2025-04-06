import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { Button, Card, Col, Row, Spin, Alert } from 'antd';
import { Helmet } from 'react-helmet';

const { Meta } = Card;

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the product based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
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

  if (loading) {
    return <Spin size="large" style={{ textAlign: 'center', marginTop: '20%' }} />;
  }

  if (error) {
    return <Alert message={error} type="error" showIcon style={{ marginTop: '20%' }} />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{product.title} | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>
    <div style={{ padding: '2rem' }}>
      <Row gutter={[16, 16]} align="top">
        {/* Image Column */}
        <Col xs={24} sm={12} md={10} lg={8} xl={7}>
          <img
            alt={product.title}
            src={product.image}
            style={{
              width: '100%',
              height: 'auto', // Maintain aspect ratio
              maxHeight: '30rem', // Maximum height in rem for responsiveness
              objectFit: 'cover',
            }}
          />
        </Col>

        {/* Details Column */}
        <Col xs={24} sm={12} md={14} lg={16} xl={17}>
          <Card
            title={product.title}
            bordered={false}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Meta description={`Price: $${product.price}`} />
            <p>{product.description}</p>

            <Button
              type="primary"
              onClick={() => addToCart(product)}
              style={{ marginTop: '1rem' }}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default ProductPage;
