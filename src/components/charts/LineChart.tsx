import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../ThemeContext';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'NIFTY50',
        data: [65, 59, 80, 81],
        borderColor: isDark ? 'lightblue' : 'blue',
        backgroundColor: isDark ? 'rgba(173, 216, 230, 0.2)' : 'rgba(135, 206, 250, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
      y: {
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
