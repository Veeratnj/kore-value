import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement } from 'chart.js';
import { useTheme } from '../ThemeContext';

ChartJS.register(RadialLinearScale, ArcElement);

export const PolarAreaChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    labels: ['Red', 'Green', 'Blue'],
    datasets: [
      {
        data: [11, 16, 7],
        backgroundColor: isDark
          ? ['#E53935', '#43A047', '#1E88E5'] // Dark theme colors
          : ['#FF5252', '#4CAF50', '#2196F3'], // Light theme colors
        borderColor: isDark
          ? ['#C62828', '#2C6B2F', '#1565C0'] // Dark theme border color
          : ['#D32F2F', '#388E3C', '#1976D2'], // Light theme border color
        borderWidth: 2, // Set border width to ensure visibility
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          backdropColor: isDark ? '#000' : '#fff', // Ensure the background color of the ticks matches the theme
          color: isDark ? '#fff' : '#000', // Change tick label color
        },
        grid: {
          color: isDark ? '#3d3d3d' : '#ddd', // Grid color change for both themes
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000', // Change label color based on theme
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};
