import { Card, Col, Row, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const data = [
  { date: 'Apr 1', sales: 240 },
  { date: 'Apr 2', sales: 321 },
  { date: 'Apr 3', sales: 213 },
  { date: 'Apr 4', sales: 452 },
  { date: 'Apr 5', sales: 390 },
  { date: 'Apr 6', sales: 500 },
  { date: 'Apr 7', sales: 620 },
];

const Sales = () => {
  return (
    <>
    <Helmet>
        <title>Sales - Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div className="md:p-4">
      <Title level={3}>Sales Overview</Title>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={8} xs={24} sm={12} md={6}>
          <Card title="Total Revenue" bordered={false}>$4,520</Card>
        </Col>
        <Col span={8} xs={24} sm={12} md={6}>
          <Card title="Orders" bordered={false}>124</Card>
        </Col>
        <Col span={8} xs={24} sm={12} md={6}>
          <Card title="New Customers" bordered={false}>32</Card>
        </Col>
      </Row>

      <Card title="Weekly Sales Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="sales" stroke="#1890ff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
    </>
  );
};

export default Sales;
