import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { useTheme } from '../ThemeContext';

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, Title);

export const BubbleChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    datasets: [
      {
        label: 'Bubbles',
        data: [
          { x: 20, y: 30, r: 10 },
          { x: 40, y: 10, r: 15 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
     maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Bubble Chart',
        color: isDark ? '#fff' : '#000',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? '#444' : '#ccc',
        },
      },
      y: {
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? '#444' : '#ccc',
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? '#001529' : '#fff',
        padding: '1rem',
        borderRadius: '10px',
      }}
    >
      <Bubble data={data} options={options} />
    </div>
  );
};
