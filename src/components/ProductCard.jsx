import { Card, Button } from 'antd';
import { useCart } from '../store/useCart';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{
            width: '100%',
            height: '250px',  // Fixed height to make images uniform
            objectFit: 'cover',  // Ensures image is cropped to maintain aspect ratio
          }}
        />
      }
    >
      <Meta title={product.title} description={`$${product.price}`} />

      <Button
        style={{ marginTop: '10px', width: '100%' }}
        type="primary"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </Button>

      <Link to={`/product/${product.id}`}>
        <Button
          style={{ marginTop: '10px', width: '100%', marginTop: '10px' }}
          type="default"
        >
          View Product
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
