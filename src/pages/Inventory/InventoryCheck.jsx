import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import Button from '../../components/UI/Button';
import { StockBadge } from '../../components/UI/Badge';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InventoryCheck() {
  const { products, categories } = useData();

  const [inventoryData, setInventoryData] = useState(
    products.map(p => ({
      ...p,
      actualStock: '',
      checked: false,
    }))
  );

  const updateActual = (id, value) => {
    setInventoryData(prev => prev.map(item =>
      item.id === id ? { ...item, actualStock: value } : item
    ));
  };

  const toggleChecked = (id) => {
    setInventoryData(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const getDifference = (item) => {
    if (item.actualStock === '' || item.actualStock === null) return null;
    return Number(item.actualStock) - item.stock;
  };

  const checkedCount = inventoryData.filter(i => i.checked).length;

  const handleComplete = () => {
    const unchecked = inventoryData.filter(i => !i.checked).length;
    if (unchecked > 0) {
      toast.error(`Còn ${unchecked} sản phẩm chưa kiểm kê`);
      return;
    }
    toast.success('✅ Kiểm kê kho hoàn tất!');
  };

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || '';

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Kiểm kê kho</h1>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
            Đã kiểm kê: {checkedCount}/{inventoryData.length} sản phẩm
          </p>
        </div>
        <Button variant="primary" icon={CheckCircle2} onClick={handleComplete}>
          Hoàn tất kiểm kê
        </Button>
      </div>

      <div className="card">
        <div className="table-container" style={{ border: 'none' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 50 }}>✓</th>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>SL Hệ thống</th>
                <th style={{ width: 120 }}>SL Thực tế</th>
                <th>Chênh lệch</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map(item => {
                const diff = getDifference(item);
                const hasDiff = diff !== null && diff !== 0;
                return (
                  <tr key={item.id} className={hasDiff ? 'highlighted' : ''} style={item.checked ? { opacity: 0.6 } : {}}>
                    <td>
                      <label className="checkbox-wrapper" onClick={() => toggleChecked(item.id)}>
                        <div className={`checkbox ${item.checked ? 'checked' : ''}`}>
                          {item.checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      </label>
                    </td>
                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{getCategoryName(item.categoryId)}</td>
                    <td><strong>{item.stock}</strong> <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-xs)' }}>{item.unit}</span></td>
                    <td>
                      <input
                        type="number"
                        className="form-input"
                        value={item.actualStock}
                        onChange={e => updateActual(item.id, e.target.value)}
                        placeholder="—"
                        min="0"
                        style={{ width: 100 }}
                      />
                    </td>
                    <td>
                      {diff !== null ? (
                        <span style={{
                          fontWeight: 600,
                          color: diff > 0 ? 'var(--success-500)' : diff < 0 ? 'var(--danger-500)' : 'var(--text-secondary)',
                        }}>
                          {diff > 0 ? `+${diff}` : diff === 0 ? '0' : diff}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                      )}
                    </td>
                    <td><StockBadge stock={item.stock} minStock={item.minStock} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
