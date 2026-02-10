import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { useTheme } from '../ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export const BarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    labels: ['TATA', 'SBIN', 'TATAMOTORS'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3],
        backgroundColor: ['red', 'blue', 'green'],
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
        text: 'Vote Results',
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
      <Bar data={data} options={options} />
    </div>
  );
};
