import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LinearScale } from 'chart.js';
import { useTheme } from '../ThemeContext';

ChartJS.register(PointElement, LinearScale);

export const ScatterChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'; // Check if the theme is dark

  const data = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
        ],
        backgroundColor: isDark ? 'rgba(255, 99, 132, 0.8)' : 'blue', // Change point color based on theme
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: isDark ? '#444' : '#ddd', // Grid line color for x-axis based on theme
        },
        ticks: {
          color: isDark ? '#fff' : '#000', // Ticks color for x-axis based on theme
        },
      },
      y: {
        grid: {
          color: isDark ? '#444' : '#ddd', // Grid line color for y-axis based on theme
        },
        ticks: {
          color: isDark ? '#fff' : '#000', // Ticks color for y-axis based on theme
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#fff' : '#000', // Change legend label color based on theme
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};
