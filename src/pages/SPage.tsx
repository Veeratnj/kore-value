import React, { useState } from 'react';
import { Card, Radio, Row, Col } from 'antd';
import '../scss/StocksPage.scss';
import { useTheme } from 'antd-style';

interface StockType {
  key: string;
  name: string;
  type: 'Export' | 'Import' | 'FMCG';
  price: number;
}

const allStocks: StockType[] = [
  { key: '1', name: 'Apple', type: 'Export', price: 180 },
  { key: '2', name: 'Samsung', type: 'Import', price: 160 },
  { key: '3', name: 'HUL', type: 'FMCG', price: 220 },
  { key: '4', name: 'Tata Tea', type: 'FMCG', price: 90 },
  { key: '5', name: 'Sony', type: 'Import', price: 145 },
  { key: '6', name: 'ITC', type: 'Export', price: 200 },
  // Add more stocks as needed
];

const StocksPage: React.FC = () => {
  const { theme }:any = useTheme(); // Get current theme
  const isDark = theme === 'dark';

  const [filter, setFilter] = useState<'All' | 'Export' | 'Import' | 'FMCG'>('All');

  const filteredStocks =
    filter === 'All' ? allStocks : allStocks.filter(stock => stock.type === filter);

  return (
    <div className={`stocks-page ${isDark ? 'dark-theme' : ''}`}>
      <div className="filter-bar">
        <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
          <Radio.Button value="All">All</Radio.Button>
          <Radio.Button value="Export">Export</Radio.Button>
          <Radio.Button value="Import">Import</Radio.Button>
          <Radio.Button value="FMCG">FMCG</Radio.Button>
        </Radio.Group>
      </div>

      <Row gutter={[16, 16]}>
        {filteredStocks.map(stock => (
          <Col key={stock.key} xs={24} sm={12} md={8} lg={6}>
            <Card
              className="stock-card"
              title={stock.name}
              bordered
              hoverable
            >
              <p><strong>Type:</strong> {stock.type}</p>
              <p><strong>Price:</strong> ₹{stock.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StocksPage;
