import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { chartData } from '../../data/mockData';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MonthlyChart({ type = 'import' }) {
  const { isDark } = useTheme();
  const isImport = type === 'import';

  const data = {
    labels: chartData.months,
    datasets: [{
      label: isImport ? 'Số phiếu nhập' : 'Số phiếu xuất',
      data: isImport ? chartData.imports : chartData.exports,
      backgroundColor: isImport ? 'rgba(34, 197, 94, 0.7)' : 'rgba(59, 130, 246, 0.7)',
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#0f172a',
        padding: 12, cornerRadius: 8,
        titleFont: { family: 'Inter' }, bodyFont: { family: 'Inter' },
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
    <div style={{ height: 250 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
