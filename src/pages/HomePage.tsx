import React from 'react';
import { Row, Col, Card } from 'antd';
import { BarChart } from '../components/charts/BarChart';
import { BubbleChart } from '../components/charts/BubbleChart';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import LineChart from '../components/charts/LineChart';
import { PieChart } from '../components/charts/PieChart';
import { PolarAreaChart } from '../components/charts/PolarAreaChart';
import { useTheme } from '../components/ThemeContext';
import '../scss/HomePage.scss';
import { RadarChart } from '../components/charts/RadarChart';
import { ScatterChart } from '../components/charts/ScatterChart';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardStyle: React.CSSProperties = {
    border: '2px solid #d9d9d9',
    backgroundColor: isDark ? "#001529" : "#fff",
    color: isDark ? "#fff" : "#000",
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#001529" : "#fff",
    minHeight: '100vh',
  };

  return (
    <div style={containerStyle}>
      <div style={{ padding: 24 }} className={isDark ? 'dark-theme' : 'light-theme'}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Bar Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <BarChart />
              </div>
            </Card>
          </Col>
          {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Bubble Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <BubbleChart />
              </div>
            </Card>
          </Col> */}
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Doughnut Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <DoughnutChart />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Line Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <LineChart />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Pie Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <PieChart />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Polar Area Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <PolarAreaChart />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Radar Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <RadarChart />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Scatter Chart" bordered style={cardStyle}>
              <div className="chart-wrapper">
                <ScatterChart />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
