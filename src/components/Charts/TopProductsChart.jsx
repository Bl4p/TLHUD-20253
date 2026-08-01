import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function TopProductsChart({ products, label = 'Tồn kho', color = 'rgba(14, 165, 233, 0.7)' }) {
  const { isDark } = useTheme();

  const top5 = [...products].sort((a, b) => b.stock - a.stock).slice(0, 5);

  const data = {
    labels: top5.map(p => p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name),
    datasets: [{
      label,
      data: top5.map(p => p.stock),
      backgroundColor: color,
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
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
        grid: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { family: 'Inter', size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { family: 'Inter', size: 11 } },
      },
    },
  };

  return (
    <div style={{ height: 250 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
