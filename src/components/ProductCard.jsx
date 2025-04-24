import { Card, Button } from 'antd';
import { useCart } from '../store/useCart';
import useNotify from '../hooks/useNotify'; // Adjust path as needed
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { notify, contextHolder } = useNotify();  // Destructure notify and contextHolder

   // Trigger notification only when the product is added to the cart
   const handleAddToCart = (product) => {
    addToCart(product);
    notify('success', 'Added to Cart', `${product.title} has been added to your cart.`, 1.5);
  };

  return (
    <>
    {/* Notification component to show notifications */}
    {contextHolder}
   
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
        <Button block type="primary" onClick={() => handleAddToCart(product)}>
          Add to Cart
        </Button>
        <Link to={`/product/${product.id}`}>
          <Button block type="default">
            View Product
          </Button>
        </Link>
      </div>
    </Card>
    </>
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
