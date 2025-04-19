import { useState, useRef } from 'react';
import { Row, Col, Layout, Spin, Input, Space, Select, Button, Divider } from 'antd';
import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const { Content } = Layout;
const { Option } = Select;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState('grid'); // slider, grid, list
  const [sortBy, setSortBy] = useState('default'); // Sort options: default, price-low-high, price-high-low, rating-high-low
  const [autoSlide, setAutoSlide] = useState(true); // Auto slide for carousel
  const sliderRef = useRef(null);

  // Fetch products with TanStack Query
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchQuery))
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  // Sort products based on selected sort option
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-low') {
      return b.price - a.price;
    } else if (sortBy === 'rating-high-low') {
      return b.rating.rate - a.rating.rate;
    }
    return 0; // default
  });

  const categories = [...new Set(products.map((product) => product.category))];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: autoSlide,
    autoplaySpeed: 3000, // Auto slide every 3 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Home | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for electronics, fashion, and more!" />
      </Helmet>

      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '20px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', color: '#333' }}>
              Alfa Store
            </h1>

            {/* Search + Category + View Mode + Sort By */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              marginTop: '20px'
            }}>
              <Input
                placeholder="Search products..."
                onChange={handleSearch}
                style={{ width: '100%', maxWidth: '300px' }}
              />

              <Select
                placeholder="Select Category"
                onChange={handleCategoryChange}
                value={selectedCategory}
                style={{ width: '100%', maxWidth: '180px' }}
              >
                <Option value="">All Categories</Option>
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>

              <Select
                value={viewMode}
                onChange={setViewMode}
                style={{ width: '100%', maxWidth: '160px' }}
              >
                <Option value="grid">Grid View</Option>
                <Option value="list">List View</Option>
              </Select>

              <Select
                value={sortBy}
                onChange={handleSortChange}
                style={{ width: '100%', maxWidth: '180px' }}
              >
                <Option value="default">Sort By: Default</Option>
                <Option value="price-low-high">Price: Low to High</Option>
                <Option value="price-high-low">Price: High to Low</Option>
                <Option value="rating-high-low">Rating: High to Low</Option>
              </Select>
            </div>

            {/* Loading */}
            {isLoading ? (
              <Spin size="large" style={{ display: 'block', margin: '0 auto' }} />
            ) : (
              <>
                {/* Featured Products Slider */}
                <section style={{ background: '#f8f8f8', padding: '20px 0', borderRadius: '8px' }}>
                  <h2 style={{
                    textAlign: 'center', marginBottom: '20px', color: '#99050d', fontSize: '2rem', fontWeight: 'bold'
                  }}>Featured Products</h2>
                  <Slider {...settings} ref={sliderRef}>
                    {sortedProducts.slice(0, 8).map((product) => (
                      <div key={product.id} style={{ padding: '0 10px' }}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </Slider>
                </section>

                <Divider />

                {/* Best Sellers */}
                <section style={{ background: '#fff', padding: '40px 0', borderRadius: '8px' }}>
                  <h2 style={{
                    textAlign: 'center', marginBottom: '20px', color: '#111', fontSize: '2rem', fontWeight: 'bold'
                  }}>Best Sellers</h2>
                  <Row gutter={[16, 16]} justify="center">
                    {sortedProducts.slice(0, 6).map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                </section>

                <Divider />

                {/* Special Offers */}
                <section style={{ background: '#fffae6', padding: '40px 0', borderRadius: '8px' }}>
                  <h2 style={{
                    textAlign: 'center', marginBottom: '20px', color: '#99050d', fontSize: '2rem', fontWeight: 'bold'
                  }}>Special Offers</h2>
                  <Row gutter={[16, 16]} justify="center">
                    {sortedProducts.slice(10, 16).map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                </section>

                <Divider />

                {/* Customer Reviews */}
                <section style={{ background: '#e6f7ff', padding: '40px 0', borderRadius: '8px' }}>
                  <h2 style={{
                    textAlign: 'center', marginBottom: '20px', color: '#0066cc', fontSize: '2rem', fontWeight: 'bold'
                  }}>Customer Reviews</h2>
                  <Row gutter={[16, 16]} justify="center">
                    {sortedProducts.slice(0, 4).map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                </section>

                <Divider />

                {/* View Mode Content */}
                {viewMode === 'grid' && (
                  <Row gutter={[16, 16]} justify="center">
                    {sortedProducts.map((product) => (
                      <Col
                        key={product.id}
                        xs={24} sm={12} md={8} lg={6} xl={4}
                      >
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                )}

                {viewMode === 'list' && (
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        listView // Pass a prop to style for list view
                      />
                    ))}
                  </Space>
                )}
              </>
            )}
          </Space>
        </Content>
      </Layout>
    </>
  );
};

export default Home;
