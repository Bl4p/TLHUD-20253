import { useData } from '../../contexts/DataContext';
import CategoryStockChart from '../../components/Charts/CategoryStockChart';
import MonthlyChart from '../../components/Charts/MonthlyChart';
import TopProductsChart from '../../components/Charts/TopProductsChart';
import Button from '../../components/UI/Button';
import { exportToCSV } from '../../utils/export';
import { FileSpreadsheet, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Reports() {
  const { products } = useData();

  const handleExport = (type) => {
    if (type === 'excel') {
      const data = products.map(p => ({
        'Mã sản phẩm (SKU)': p.sku,
        'Tên sản phẩm': p.name,
        'Danh mục': p.categoryId,
        'Tồn kho': p.stock,
        'Đơn vị tính': p.unit,
        'Giá bán': p.sellPrice
      }));
      exportToCSV('Bao_Cao_Ton_Kho.csv', data);
      toast.success('Đã xuất file báo cáo!');
    } else {
      toast('🚧 Tính năng đang phát triển', { icon: '📋' });
    }
  };

  // Simulate top sold products (reverse stock = more sold)
  const topSold = [...products].map(p => ({ ...p, stock: Math.floor(Math.random() * 200) + 10 }));

  return (
    <div>
      <div className="page-header">
        <h1>Báo cáo</h1>
        <div className="page-header-actions">
          <Button variant="secondary" icon={FileSpreadsheet} onClick={() => handleExport('excel')}>
            Xuất Excel
          </Button>
          <Button variant="secondary" icon={FileText} onClick={() => handleExport('pdf')}>
            Xuất PDF
          </Button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card animate-fade-in-up">
          <div className="card-header">
            <h3>Tồn kho theo danh mục</h3>
          </div>
          <div className="card-body">
            <CategoryStockChart />
          </div>
        </div>

        <div className="card animate-fade-in-up">
          <div className="card-header">
            <h3>Nhập kho theo tháng</h3>
          </div>
          <div className="card-body">
            <MonthlyChart type="import" />
          </div>
        </div>

        <div className="card animate-fade-in-up">
          <div className="card-header">
            <h3>Xuất kho theo tháng</h3>
          </div>
          <div className="card-body">
            <MonthlyChart type="export" />
          </div>
        </div>

        <div className="card animate-fade-in-up">
          <div className="card-header">
            <h3>Top sản phẩm tồn nhiều</h3>
          </div>
          <div className="card-body">
            <TopProductsChart products={products} label="Tồn kho" color="rgba(14, 165, 233, 0.7)" />
          </div>
        </div>
      </div>

      <div className="card animate-fade-in-up" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h3>Top sản phẩm bán chạy (demo)</h3>
        </div>
        <div className="card-body">
          <TopProductsChart products={topSold} label="Số lượng bán" color="rgba(34, 197, 94, 0.7)" />
        </div>
      </div>
    </div>
  );
}
