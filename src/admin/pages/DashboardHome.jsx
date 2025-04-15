import { useRef, useState } from 'react';
import { Card, Col, Row, Typography, Button, message, Spin } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const DashboardHome = () => {
  const navigate = useNavigate();
  const dashboardRef = useRef(); // Ref for capturing dashboard section
  const [loading, setLoading] = useState(false); // State for controlling the loader

  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 5000, revenue: 9800 },
    { month: 'Apr', sales: 4780, revenue: 3908 },
    { month: 'May', sales: 5890, revenue: 4800 },
    { month: 'Jun', sales: 4390, revenue: 3800 },
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

  const COLORS = ['#52c41a', '#faad14', '#f5222d', '#13c2c2'];

  // Export to PDF handler
  const handleExportPDF = async () => {
    setLoading(true); // Start loader before PDF generation

    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size

      // Get image properties (width and height)
      const imgProps = pdf.getImageProperties(imgData);

      // Get the PDF dimensions for A4 paper
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Width of the A4 paper
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Height of the A4 paper

      // Calculate the scaling factor for the image to fit the PDF size
      const imgRatio = imgProps.width / imgProps.height;
      const pdfRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;

      // If the image ratio is greater than the PDF ratio, it will fit width-wise
      if (imgRatio > pdfRatio) {
        finalWidth = pdfWidth;
        finalHeight = pdfWidth / imgRatio; // Maintain aspect ratio
      } else {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * imgRatio; // Maintain aspect ratio
      }

      // Add image to PDF, ensuring it covers the page with no distortion
      pdf.addImage(imgData, 'PNG', 0, 20, finalWidth, finalHeight);

      // Add watermark text at the bottom of the page
      const watermarkText = "Alfa Store";
      const fontSize = 20;  // Size of the watermark text
      const margin = 10;  // Margin from the bottom of the page

      pdf.setFontSize(fontSize);
      pdf.setTextColor(150);  // Gray color for the watermark text
      pdf.text(watermarkText, pdfWidth / 2 - pdf.getTextWidth(watermarkText) / 2, pdfHeight - margin);

      // Add additional information (Date, Time, etc.)
      const currentDate = new Date();
      const dateStr = currentDate.toLocaleDateString();  // Format date
      const timeStr = currentDate.toLocaleTimeString();  // Format time
      const additionalInfo = `Generated on: ${dateStr} at ${timeStr}`;

      pdf.setFontSize(8);  // Set a smaller font size for additional info
      pdf.setTextColor(150);  // Light grey color for the date/time info
      pdf.text(additionalInfo, pdfWidth - 10 - pdf.getTextWidth(additionalInfo), pdfHeight - margin - 15);

      // Add a custom title for the report (e.g., Dashboard Report)
      const reportTitle = "Dashboard Report - Alfa Store";
      pdf.setFontSize(12);  // Set a larger font size for the title
      pdf.setTextColor(0);  // Black color for the title
      pdf.text(reportTitle, pdfWidth / 2 - pdf.getTextWidth(reportTitle) / 2, 15);

      // Add page number (e.g., "Page 1")
      const pageNumber = `Page ${pdf.internal.getNumberOfPages()}`;
      pdf.setFontSize(8);  // Small font size for page number
      pdf.setTextColor(150);  // Light grey color for the page number
      pdf.text(pageNumber, pdfWidth - 10 - pdf.getTextWidth(pageNumber), pdfHeight - margin - 30);

      // Save the PDF with the watermark, additional info, title, and page number
      pdf.save('dashboard-report.pdf');

      message.success('PDF exported successfully!');
    } catch (err) {
      console.error(err);
      message.error('Failed to export PDF');
    } finally {
      setLoading(false); // Stop loader after PDF generation
    }
  };

  const handleLogout = () => {
    // Remove token info from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Admin | Alfa Store</title>
        <meta name="description" content="Manage your Alfa Store account, orders, and preferences." />
      </Helmet>

      <div>
        <Title level={3}>Welcome back, Admin 👋</Title>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button type="primary" onClick={handleExportPDF} disabled={loading}>
          {loading ? <Spin size="small" style={{ color: 'white' }} /> : 'Print Report'}
        </Button>
          {/* Logout Button */}
        <Button
          danger
          onClick={handleLogout}
          style={{ marginBottom: '20px' }}
          >
          Logout
        </Button>
        </div>

        <div ref={dashboardRef}>
        <Row gutter={[16, 16]} className="my-6">
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false}>
              <Title level={5}>Monthly Orders</Title>
              <Title level={3}>1,254</Title>
              <p style={{ color: '#52c41a' }}>
                <ArrowUpOutlined /> 8.5% <span style={{ color: '#999' }}>vs last month</span>
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card bordered={false}>
              <Title level={5}>Monthly Revenue</Title>
              <Title level={3}>$12,340</Title>
              <p style={{ color: '#f5222d' }}>
                <ArrowDownOutlined /> 3.2% <span style={{ color: '#999' }}>vs last month</span>
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card bordered={false}>
              <Title level={5}>New Users</Title>
              <Title level={3}>217</Title>
              <p style={{ color: '#52c41a' }}>
                <ArrowUpOutlined /> 12.4% <span style={{ color: '#999' }}>vs last month</span>
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card bordered={false}>
              <Title level={5}>Active Products</Title>
              <Title level={3}>92</Title>
              <p style={{ color: '#52c41a' }}>
                <ArrowUpOutlined /> 2.1% <span style={{ color: '#999' }}>vs last month</span>
              </p>
            </Card>
          </Col>
        </Row>

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
                      <Cell key={`cell-orders-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Revenue Trends">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#f5222d" fill="#fff1f0" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
      </div>
    </>
  );
};

export default DashboardHome;
