import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend
} from 'chart.js';
import { chartData } from '../../data/mockData';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ImportExportChart() {
  const { isDark } = useTheme();

  const data = {
    labels: chartData.months,
    datasets: [
      {
        label: 'Nhập kho',
        data: chartData.imports,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Xuất kho',
        data: chartData.exports,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#94a3b8' : '#64748b',
          usePointStyle: true,
          pointStyleWidth: 10,
          padding: 20,
          font: { family: 'Inter', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#0f172a',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { family: 'Inter' } },
      },
      y: {
        grid: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { family: 'Inter' } },
      },
    },
  };

  return (
    <div style={{ height: 300 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
