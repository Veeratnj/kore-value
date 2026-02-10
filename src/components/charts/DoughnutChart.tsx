import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { useTheme } from '../ThemeContext';

ChartJS.register(ArcElement);

export const DoughnutChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    labels: ['profit', 'Loss'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: isDark
          ? ['#4caf50', '#333'] // Dark theme colors
          : ['#4caf50', '#ccc'], // Light theme colors
      },
    ],
  };

  return <Doughnut data={data} />;
};
