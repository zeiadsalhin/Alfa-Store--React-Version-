import { Card, Col, Row, Typography } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const DashboardHome = () => {
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4780 },
    { month: 'May', sales: 5890 },
    { month: 'Jun', sales: 4390 },
  ];

  const userGrowth = [
    { month: 'Jan', users: 200 },
    { month: 'Feb', users: 450 },
    { month: 'Mar', users: 600 },
    { month: 'Apr', users: 750 },
    { month: 'May', users: 850 },
    { month: 'Jun', users: 950 },
  ];

  const ordersData = [
    { name: 'Completed', value: 400 },
    { name: 'Pending', value: 300 },
    { name: 'Cancelled', value: 100 },
  ];

  const COLORS = ['#52c41a', '#faad14', '#f5222d'];

  return (
    <>
    <Helmet>
        <title>Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>
    <div>
      <Title level={3}>Welcome back, Admin 👋</Title>

      <Row gutter={[16, 16]} className="my-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <ShoppingCartOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            <Title level={5}>Total Orders</Title>
            <p>1,254</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <UserOutlined style={{ fontSize: 24, color: '#52c41a' }} />
            <Title level={5}>Total Users</Title>
            <p>743</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <AppstoreOutlined style={{ fontSize: 24, color: '#faad14' }} />
            <Title level={5}>Total Products</Title>
            <p>92</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <DollarCircleOutlined style={{ fontSize: 24, color: '#f5222d' }} />
            <Title level={5}>Revenue</Title>
            <p>$12,340</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Monthly Sales Overview">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#1890ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#52c41a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Orders Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ordersData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {ordersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default DashboardHome;
