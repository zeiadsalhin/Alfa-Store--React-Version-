import { useState, useRef, useEffect } from 'react';
import { Row, Col, Layout, Spin, Input, Space, Select, FloatButton, Divider, Button } from 'antd';
import { ArrowUpOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
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
  const [viewMode, setViewMode] = useState('grid');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [autoSlide, setAutoSlide] = useState(true);
  const sliderRef = useRef(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
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

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-low') {
      return b.price - a.price;
    } else if (sortBy === 'rating-high-low') {
      return b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  const categories = [...new Set(products.map((product) => product.category))];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // we will create custom arrows outside
    autoplay: autoSlide,
    autoplaySpeed: 3000,
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <>
      <Helmet>
        <title>Home | Alfa Store</title>
        <meta name="description" content="Welcome to Alfa Store, your one-stop-shop for electronics, fashion, and more!" />
      </Helmet>

      <Layout className="min-h-screen">
        <Content className="p-5">
          <Space direction="vertical" className="w-full">
            <h1 className="text-center text-3xl font-bold text-gray-800">
              Alfa Store
            </h1>

            {/* Search + Category + View Mode + Sort By */}
            <div className="flex justify-center flex-wrap gap-3 my-5">
              <Input
                placeholder="Search products..."
                onChange={handleSearch}
                className="w-full max-w-[300px]"
              />

              <Select
                placeholder="Select Category"
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="w-full max-w-[160px]"
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
                className="w-full max-w-[130px]"
              >
                <Option value="grid">Grid View</Option>
                <Option value="list">List View</Option>
              </Select>

              <Select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full max-w-[300px]"
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
                {/* Featured Products with Custom Arrows */}
                <section className="bg-gray-100 py-5 rounded-lg relative">
                  <h2 className="text-center mb-5 text-[#99050d] text-2xl font-bold">
                    Featured Products
                  </h2>

                  <div className="relative">
                    {/* Left Arrow */}
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<LeftOutlined />}
                      size="large"
                      onClick={handlePrev}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                      }}
                    />
                    
                    {/* Right Arrow */}
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<RightOutlined />}
                      size="large"
                      onClick={handleNext}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                      }}
                    />

                    {/* Slider */}
                    <Slider {...settings} ref={sliderRef}>
                      {sortedProducts.slice(0, 8).map((product) => (
                        <div key={product.id} className='p-1'>
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </section>

                <Divider />

                {/* Best Sellers */}
                <section className="bg-white py-10 rounded-lg">
                  <h2 className="text-center mb-5 text-gray-800 text-2xl font-bold">
                    Best Sellers
                  </h2>
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
                <section className="bg-[#fffae6] py-10 rounded-lg">
                  <h2 className="text-center mb-5 text-[#99050d] text-2xl font-bold">
                    Special Offers
                  </h2>
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
                <section className="bg-[#e6f7ff] py-10 rounded-lg">
                  <h2 className="text-center mb-5 text-[#0066cc] text-2xl font-bold">
                    Customer Reviews
                  </h2>
                  <Row gutter={[16, 16]} justify="center">
                    {sortedProducts.slice(0, 4).map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                </section>

                <Divider />
                
                <h2 className="text-center mb-5 text-[#0066cc] text-2xl font-bold">
                  More Products
                </h2>

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
                  <Space direction="vertical" className="w-full">
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        listView
                      />
                    ))}
                  </Space>
                )}
              </>
            )}
          </Space>
        </Content>
      </Layout>

      {showScrollTop && (
        <FloatButton
          icon={<ArrowUpOutlined />}
          type="primary"
          className="absolute right-6 bottom-6"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      )}
    </>
  );
};

export default Home;
