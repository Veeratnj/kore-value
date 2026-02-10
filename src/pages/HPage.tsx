import React, { useState } from 'react';
import { Table, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import '../scss/HistoryPage.scss';
import { useTheme } from '../components/ThemeContext';

interface DataType {
  key: string;
  stockName: string;
  orderType: string;
  qty: number;
  entryPrice: number;
  exitPrice: number;
  status: 'Pending' | 'Active' | 'Closed' | 'Rejected';
  date: string; // ISO format
}

const allData: DataType[] = [
  {
    key: '1',
    stockName: 'Laptop',
    orderType: 'Buy',
    qty: 5,
    entryPrice: 50000,
    exitPrice: 52000,
    status: 'Active',
    date: '2025-05-17',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  {
    key: '2',
    stockName: 'Cables',
    orderType: 'Sell',
    qty: 20,
    entryPrice: 200,
    exitPrice: 220,
    status: 'Closed',
    date: '2025-05-10',
  },
  
  // Add more dummy entries
];

const filterByDate = (range: string, data: DataType[]): DataType[] => {
  const today = moment();
  switch (range) {
    case 'Today':
      return data.filter(item => moment(item.date).isSame(today, 'day'));
    case 'Week':
      return data.filter(item => moment(item.date).isSame(today, 'week'));
    case 'Month':
      return data.filter(item => moment(item.date).isSame(today, 'month'));
    case 'Year':
      return data.filter(item => moment(item.date).isSame(today, 'year'));
    default:
      return data;
  }
};

const HistoryPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedRange, setSelectedRange] = useState('All');

  const filteredData = filterByDate(selectedRange, allData);

  const columns: ColumnsType<DataType> = [
    { title: 'Stock Name', dataIndex: 'stockName', key: 'stockName', fixed: 'left' },
    { title: 'Order Type', dataIndex: 'orderType', key: 'orderType' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    { title: 'Entry Price', dataIndex: 'entryPrice', key: 'entryPrice' },
    { title: 'Exit Price', dataIndex: 'exitPrice', key: 'exitPrice' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    
  <div className={`history-page ${isDark ? 'dark-theme' : 'light-theme'}`}>
    <div className="filter-bar">
      <Radio.Group value={selectedRange} onChange={e => setSelectedRange(e.target.value)}>
        <Radio.Button value="Today">Today</Radio.Button>
        <Radio.Button value="Week">Week</Radio.Button>
        <Radio.Button value="Month">Month</Radio.Button>
        <Radio.Button value="Year">Year</Radio.Button>
        <Radio.Button value="All">All</Radio.Button>
      </Radio.Group>
    </div>

    <div className="table-wrapper">
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
        bordered
      />
    </div>
  </div>


  );
};

export default HistoryPage;
