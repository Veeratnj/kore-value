import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { useTheme } from '../ThemeContext';

ChartJS.register(ArcElement);

export const PieChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    labels: ['Chrome', 'Firefox', 'Safari'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: isDark
          ? ['#1E88E5', '#FF7043', '#BDBDBD']  // Dark theme colors
          : ['#4285F4', '#FF7139', '#AAA'],  // Light theme colors
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000', // Change label color based on theme
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};
