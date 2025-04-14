// src/admin/DashboardLayout.jsx
import { Layout, Menu } from 'antd';
import { BarChartOutlined, ShopOutlined, TeamOutlined, AppstoreOutlined, FileTextOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { key: '/admin', icon: <BarChartOutlined />, label: 'Dashboard' },
    { key: '/admin/branches', icon: <ShopOutlined />, label: 'Branches' },
    { key: '/admin/managers', icon: <TeamOutlined />, label: 'Managers' },
    { key: '/admin/products', icon: <AppstoreOutlined />, label: 'Products' },
    { key: '/admin/orders', icon: <FileTextOutlined />, label: 'Orders' }, 
    { key: '/admin/sales', icon: <DollarOutlined />, label: 'Sales' },    
    { key: '/admin/users', icon: <UserOutlined />, label: 'Users' }, 
  ];  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible breakpoint='lg' theme="dark">
        <div className="text-white opacity-90 text-base font-semibold text-center my-4">Store Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/admin']}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content className="m-3 md:p-6 p-3 bg-white rounded shadow">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
