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
            className="w-full max-h-[250px] object-cover"
          />
        </Link>
      }
      className="h-full flex flex-col justify-between"
    >
      <Meta 
        title={
          <div className="max-h-12 overflow-hidden truncate whitespace-nowrap">
            {product.title}
          </div>
        } 
        description={`$${product.price}`} 
      />

      <div className="mt-[10px] flex flex-col gap-2">
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
