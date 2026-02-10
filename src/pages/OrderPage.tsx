import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from '../components/ThemeContext';
import '../scss/OrderPage.scss';

interface DataType {
  key: string;
  stockName: string;
  orderType: string;
  qty: number;
  entryTime: string;
  exitTime: string;
  entryPrice: number;
  exitPrice: number;
  gstNumber: string;
  hsnNumber: string;
  status: 'Pending' | 'Active' | 'Closed' | 'Rejected';
}

const OrderPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const data: DataType[] = [
    {
      key: '1',
      stockName: 'Laptop',
      orderType: 'Buy',
      qty: 5,
      entryTime: '2024-08-01 09:00',
      exitTime: '2024-08-01 16:00',
      entryPrice: 50000,
      exitPrice: 52000,
      gstNumber: '29ABCDE1234F2Z5',
      hsnNumber: '84713010',
      status: 'Active',
    },
    {
      key: '2',
      stockName: 'Cables',
      orderType: 'Sell',
      qty: 20,
      entryTime: '2024-08-01 10:00',
      exitTime: '2024-08-01 15:30',
      entryPrice: 200,
      exitPrice: 220,
      gstNumber: '29ABCDE1234F2Z5',
      hsnNumber: '85444210',
      status: 'Closed',
    },
  ];

  const filteredData = statusFilter ? data.filter(item => item.status === statusFilter) : data;

  const handleMenuClick = (e: any) => {
    setStatusFilter(e.key === 'All' ? null : e.key);
  };

  const statusMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Pending">Pending</Menu.Item>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="Closed">Closed</Menu.Item>
      <Menu.Item key="Rejected">Rejected</Menu.Item>
    </Menu>
  );

  const columns: ColumnsType<DataType> = [
    { title: 'Stock Name', dataIndex: 'stockName', key: 'stockName', fixed: 'left' },
    { title: 'Order Type', dataIndex: 'orderType', key: 'orderType' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    { title: 'Entry Time', dataIndex: 'entryTime', key: 'entryTime' },
    { title: 'Exit Time', dataIndex: 'exitTime', key: 'exitTime' },
    { title: 'Entry Price', dataIndex: 'entryPrice', key: 'entryPrice' },
    { title: 'Exit Price', dataIndex: 'exitPrice', key: 'exitPrice' },
    { title: 'GST Number', dataIndex: 'gstNumber', key: 'gstNumber' },
    { title: 'HSN Number', dataIndex: 'hsnNumber', key: 'hsnNumber' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div className={`order-page ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <div className="table-header" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Dropdown overlay={statusMenu} placement="bottomRight">
          <Button>Filter by Status {statusFilter ? `: ${statusFilter}` : ': All'}</Button>
        </Dropdown>
      </div>

      <div className="table-wrapper">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          scroll={{ x: 1400 }}
          bordered
        />
      </div>
    </div>
  );
};

export default OrderPage;