import React from 'react';
import { Card } from 'antd';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../scss/CardPage.scss';
import HomePage from './HomePage';
import SPage from './SPage';
import HPage from './HPage';
import CSPage from './CSPage';
import OrderPage from './OrderPage';
import ToolsPage from './ToolsPage';
import { useTheme } from '../components/ThemeContext';

const CardPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Card
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: isDark ? '#001529' : '#fff',
          color: isDark ? '#fff' : '#000',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingBottom: 16,
        }}
        bodyStyle={{
          flex: 1,
          overflowY: 'auto', // internal scroll
          padding: 16,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/s" element={<SPage />} />
          <Route path="/h" element={<HPage />} />
          <Route path="/cs" element={<CSPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/t" element={<ToolsPage />} />
        </Routes>
      </Card>
    </div>
  );
};


export default CardPage;
