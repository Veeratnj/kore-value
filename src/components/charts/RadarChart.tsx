import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { useTheme } from '../ThemeContext';

// Register necessary Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const RadarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    labels: ['Strength', 'Speed', 'Stamina', 'Skill', 'Agility'],
    datasets: [
      {
        label: 'Player A',
        data: [90, 59, 90, 81, 50],
        backgroundColor: isDark
          ? 'rgba(255, 99, 132, 0.2)'
          : 'rgba(255, 99, 132, 0.4)',
        borderColor: isDark
          ? 'rgba(255, 99, 132, 1)'
          : 'rgba(255, 99, 132, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: isDark ? '#fff' : '#000',
        pointBorderColor: isDark ? '#fff' : '#000',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          backdropColor: isDark ? '#333' : '#fff',
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? '#444' : '#ccc',
        },
        angleLines: {
          color: isDark ? '#666' : '#aaa',
        },
        pointLabels: {
          color: isDark ? '#fff' : '#000',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#333' : '#fff',
        titleColor: isDark ? '#fff' : '#000',
        bodyColor: isDark ? '#fff' : '#000',
        borderColor: isDark ? '#888' : '#ccc',
        borderWidth: 1,
      },
    },
  };

  return <Radar data={data} options={options} />;
};
