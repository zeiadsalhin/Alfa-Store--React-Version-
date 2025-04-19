import { useState, useRef } from 'react';
import { Row, Col, Layout, Spin, Input, Space, Select, Button } from 'antd';
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
  const [viewMode, setViewMode] = useState('slider'); // slider, grid, list
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

  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchQuery))
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  const categories = [...new Set(products.map((product) => product.category))];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
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
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
              Alfa Store
            </h1>

            {/* Search + Category + View Mode */}
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
                <Option value="slider">Slider View</Option>
                <Option value="grid">Grid View</Option>
                <Option value="list">List View</Option>
              </Select>
            </div>

            {/* Loading */}
            {isLoading ? (
              <Spin size="large" style={{ display: 'block', margin: '0 auto' }} />
            ) : (
              <>
                {viewMode === 'slider' && (
                  <Slider {...settings} ref={sliderRef}>
                    {filteredProducts.map((product) => (
                      <div key={product.id} style={{ padding: '0 10px' }}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </Slider>
                )}

                {viewMode === 'grid' && (
                  <Row gutter={[16, 16]} justify="center">
                    {filteredProducts.map((product) => (
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
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        listView // Pass prop to make the card full-width
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
