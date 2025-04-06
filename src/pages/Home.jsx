import { useEffect, useState, useRef } from 'react';
import { Row, Col, Layout, Spin, Input, Space, Select } from 'antd';
import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet';

const { Content } = Layout;
const { Option } = Select;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category selection
  const [visibleProducts, setVisibleProducts] = useState(10); // Start by showing 10 products
  const observer = useRef(null); // Reference for the IntersectionObserver

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Setup IntersectionObserver to load more products when the last product comes into view
    const observerCallback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisibleProducts((prev) => Math.min(prev + 10, products.length)); // Load next 10 products
      }
    };

    const options = {
      rootMargin: '0px',
      threshold: 1.0, // 100% of the target element must be visible
    };

    observer.current = new IntersectionObserver(observerCallback, options);

    if (observer.current) {
      const lastProduct = document.querySelector('#last-product');
      if (lastProduct) {
        observer.current.observe(lastProduct);
      }
    }

    // Clean up observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  // Filter products by search query and selected category
  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchQuery))
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  // Get unique categories from the products
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <>
      <Helmet>
        <title>Home | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for all things amazing!" />
      </Helmet>
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>Alfa Store</h1>

          {/* Search and Category Filter Row */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            marginBottom: '20px',
            marginTop: '20px',
            flexWrap: 'wrap',
          }}>
            {/* Search Input */}
            <Input
              placeholder="Search products..."
              onChange={handleSearch}
              style={{
                width: '100%',
                maxWidth: '400px',
              }}
            />

            {/* Category Select Dropdown */}
            <Select
              placeholder="Select Category"
              style={{ width: '100%', maxWidth: '200px' }}
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <Option value="">All Categories</Option>
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </div>

          {/* Loading Spinner or Products */}
          {loading ? (
            <Spin size="large" style={{ display: 'block', margin: '0 auto' }} />
          ) : (
            <Row gutter={[16, 16]} justify="center">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <Col
                  key={product.id}
                  xs={24} sm={12} md={8} lg={6} xl={4} // Responsive breakpoints
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}

          {/* Invisible Div to trigger intersection observer when the last product is visible */}
          <div id="last-product" style={{ height: '1px' }} />
        </Space>
      </Content>
    </Layout>
    </>
  );
};

export default Home;
