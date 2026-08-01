import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useData } from '../../contexts/DataContext';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryStockChart() {
  const { products, categories } = useData();
  const { isDark } = useTheme();

  const categoryStocks = categories.map(cat => ({
    name: cat.name,
    stock: products.filter(p => p.categoryId === cat.id).reduce((sum, p) => sum + p.stock, 0),
  }));

  const colors = [
    'rgba(14, 165, 233, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(139, 92, 246, 0.8)',
  ];

  const data = {
    labels: categoryStocks.map(c => c.name),
    datasets: [{
      data: categoryStocks.map(c => c.stock),
      backgroundColor: colors,
      borderWidth: 2,
      borderColor: isDark ? '#1e293b' : '#ffffff',
      hoverOffset: 8,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#94a3b8' : '#64748b',
          usePointStyle: true,
          pointStyleWidth: 10,
          padding: 16,
          font: { family: 'Inter', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#0f172a',
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
      },
    },
    cutout: '60%',
  };

  return (
    <div style={{ height: 300 }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
