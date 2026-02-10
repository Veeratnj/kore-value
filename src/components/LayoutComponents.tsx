import React, { useState } from 'react';
import {
  BarChartOutlined,
  BorderOuterOutlined,
  HeatMapOutlined,
  HistoryOutlined,
  HomeOutlined,
  StockOutlined,
  ToolFilled,
  ToolOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme as antdTheme, type MenuProps } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import { useTheme } from './ThemeContext';
import HomePage from '../pages/HomePage';
import StocksPage from '../pages/SPage';
import CandlestickPage from '../pages/CSPage';
import HistoryPage from '../pages/HPage';
import CardPage from '../pages/CardPage';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<span style={{ visibility: 'hidden' }}>.</span>, 'home', <HeatMapOutlined />),
  getItem('Home', '2', <HomeOutlined />),
  getItem('Stocks', 's', <StockOutlined />),
  getItem('History', 'h', <HistoryOutlined />),
  getItem('Agents', 'cs', <BarChartOutlined />),
  getItem('Order', 'order', <BorderOuterOutlined />),
  getItem('Tools', 't', <ToolOutlined />),
];

const LayoutComponents: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { token } = antdTheme.useToken();
  const navigate = useNavigate();
  
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout style={{ minHeight: '100vh',
      
    }}>
      {/* <Sider style={{
      background: isDark ? '#02003c' : '#e0e0e0',
      color: isDark ? '#e0e0e0' : '#02003c',
      }}  
      collapsible collapsed={collapsed} onCollapse={setCollapsed} theme={theme}>
        <div className="demo-logo-vertical" />
        <Menu
          theme={theme}
          defaultSelectedKeys={['2']}
          style={{
            background: isDark ? '#02003c' : '#e0e0e0',
            color: isDark ? '#e0e0e0' : '#02003c',
          }}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            navigate(key === '2' ? '/' : `/${key}`);
          }}
        />
      </Sider> */}

      <Layout
      style={{ height: '100vh' }}
        
      >
        <Header style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '10vh',
          padding: 0,
          zIndex: 1000,
        }}>
          <HeaderComponent toggleTheme={toggleTheme} currentTheme={theme} />
        </Header>

        <Content
          style={{
            marginTop: '10vh',
            marginBottom: '5vh',
            height: 'calc(100vh - 15vh)',
            backgroundColor: isDark ? '#001529' : '#fff',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',  // Important to prevent page scroll here
          }}
        >
          <CardPage />
        </Content>



        <Footer
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: '5vh',   // can adjust footer height
            textAlign: 'center',
            background: isDark ? '#141414' : '#fff',
            color: isDark ? '#fff' : '#000',
            zIndex: 1000,
          }}
        >
          AI powered Algo
        </Footer>
      </Layout>
    </Layout>
  );
};

// Wrap LayoutComponents with Router and export
const AppWithRouter = () => (
  <Router>
    <LayoutComponents />
  </Router>
);

export default AppWithRouter;
