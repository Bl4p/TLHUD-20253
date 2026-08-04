import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import ImportExportChart from '../../components/Charts/ImportExportChart';
import { SkeletonStatCard, SkeletonChart } from '../../components/UI/SkeletonLoader';
import { StockBadge } from '../../components/UI/Badge';
import {
  Package, Layers, ArrowDownToLine, ArrowUpFromLine, AlertTriangle
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const { getStats, products, imports, exports } = useData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const stats = getStats();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    { label: 'Tổng sản phẩm', value: stats.totalProducts, icon: Package, color: 'primary' },
    { label: 'Tổng tồn kho', value: stats.totalStock.toLocaleString('vi-VN'), icon: Layers, color: 'success' },
    { label: 'Phiếu nhập hôm nay', value: stats.todayImports, icon: ArrowDownToLine, color: 'info' },
    { label: 'Phiếu xuất hôm nay', value: stats.todayExports, icon: ArrowUpFromLine, color: 'warning' },
    { label: 'Hàng sắp hết', value: stats.lowStockProducts.length + stats.outOfStockProducts.length, icon: AlertTriangle, color: 'danger' },
  ];

  const lowStockItems = products
    .filter(p => p.stock <= p.minStock)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  const dynamicActivities = [
    ...imports.filter(i => i.status === 'completed').map(i => ({
      id: `act-imp-${i.id}`,
      type: 'import',
      message: `Duyệt Phiếu nhập ${i.code}`,
      time: new Date(i.date).toLocaleDateString('vi-VN'),
      dateObj: new Date(i.date)
    })),
    ...exports.filter(e => e.status === 'completed').map(e => ({
      id: `act-exp-${e.id}`,
      type: 'export',
      message: `Duyệt Phiếu xuất ${e.code}`,
      time: new Date(e.date).toLocaleDateString('vi-VN'),
      dateObj: new Date(e.date)
    }))
  ].sort((a, b) => b.dateObj - a.dateObj).slice(0, 10);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Tổng quan hoạt động kho hàng</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonStatCard key={i} />)
        ) : (
          statCards.map((stat, i) => (
            <div key={stat.label} className={`card card-hover stat-card animate-fade-in-up stagger-${i + 1}`}>
              <div className={`stat-card-icon ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="stat-card-info">
                <p className="stat-card-label">{stat.label}</p>
                <p className="stat-card-value">{stat.value}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Charts & Activity */}
      <div className="dashboard-grid">
        <div className="card animate-fade-in-up">
          <div className="card-header">
            <h3>Biểu đồ Nhập / Xuất kho</h3>
          </div>
          <div className="card-body">
            {loading ? <SkeletonChart /> : <ImportExportChart />}
          </div>
        </div>

        <div className="card animate-fade-in-up">
          <div className="card-header">
            <h3>Hoạt động gần đây</h3>
          </div>
          <div className="card-body" style={{ maxHeight: 380, overflowY: 'auto' }}>
            {dynamicActivities.length === 0 ? (
              <div style={{ padding: 'var(--space-4)', textAlign: 'center', color: 'var(--text-tertiary)' }}>Chưa có hoạt động nào.</div>
            ) : (
              dynamicActivities.map(act => (
                <div key={act.id} className="activity-item">
                  <div className={`activity-dot ${act.type}`} />
                  <div className="activity-content">
                    <p>{act.message}</p>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="card animate-fade-in-up" style={{ marginTop: 'var(--space-6)' }}>
          <div className="card-header">
            <h3>⚠️ Hàng sắp hết / Hết hàng</h3>
          </div>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>SKU</th>
                  <th>Tồn kho</th>
                  <th>Tối thiểu</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map(p => (
                  <tr key={p.id} className={p.stock === 0 ? 'highlighted' : ''}>
                    <td>
                      <span style={{ fontWeight: 500, cursor: 'pointer', color: 'var(--primary-500)' }} onClick={() => navigate(`/products/${p.id}`)}>
                        {p.name}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{p.sku}</td>
                    <td><strong>{p.stock}</strong></td>
                    <td style={{ color: 'var(--text-secondary)' }}>{p.minStock}</td>
                    <td><StockBadge stock={p.stock} minStock={p.minStock} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
