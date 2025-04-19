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
        <Link to={`/product/${product.id}`}>
          <img
            alt={`Image of ${product.title}`}
            src={product.image}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
            }}
          />
        </Link>
      }
      style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <Meta 
        title={
          <div style={{ 
            maxHeight: '3rem', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' 
          }}>
            {product.title}
          </div>
        } 
        description={`$${product.price}`} 
      />

      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button block type="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
        <Link to={`/product/${product.id}`}>
          <Button block type="default">
            View Product
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;
