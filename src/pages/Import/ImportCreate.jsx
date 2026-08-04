import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../../components/UI/Button';
import { Plus, Trash2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImportCreate() {
  const { products, suppliers, addImport } = useData();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState({
    supplierId: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
    items: [{ productId: '', quantity: 1 }],
  });

  const addItem = () => {
    setForm(prev => ({ ...prev, items: [...prev.items, { productId: '', quantity: 1 }] }));
  };

  const removeItem = (index) => {
    if (form.items.length <= 1) return;
    setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const updateItem = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? { ...item, [field]: field === 'quantity' ? Number(value) : value } : item),
    }));
  };

  const handleSubmit = () => {
    if (!form.supplierId) { toast.error('Vui lòng chọn nhà cung cấp'); return; }
    const validItems = form.items.filter(it => it.productId && it.quantity > 0);
    if (validItems.length === 0) { toast.error('Vui lòng thêm ít nhất 1 sản phẩm'); return; }

    const result = addImport({ ...form, items: validItems });
    addNotification({ type: 'import', title: 'Phiếu nhập mới', message: `${result.code} đã được tạo` });
    toast.success('🎉 Nhập kho thành công!');

    setForm({ supplierId: '', date: new Date().toISOString().split('T')[0], note: '', items: [{ productId: '', quantity: 1 }] });
  };

  const supplier = suppliers.find(s => s.id === form.supplierId);

  return (
    <div>
      <div className="page-header">
        <h1>Tạo phiếu nhập kho</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Nhà cung cấp</label>
              <select className="form-select" value={form.supplierId} onChange={e => setForm(prev => ({ ...prev, supplierId: e.target.value }))}>
                <option value="">-- Chọn nhà cung cấp --</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {supplier && <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>📞 {supplier.phone} • ✉️ {supplier.email}</span>}
            </div>
            <div className="form-group">
              <label className="form-label required">Ngày nhập</label>
              <input type="date" className="form-input" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} />
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-3)' }}>
              <h4>Sản phẩm nhập</h4>
              <Button variant="outline" size="sm" icon={Plus} onClick={addItem}>Thêm dòng</Button>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th>Sản phẩm</th>
                    <th style={{ width: 120 }}>Số lượng</th>
                    <th style={{ width: 60 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <select className="form-select" value={item.productId} onChange={e => updateItem(i, 'productId', e.target.value)} style={{ minWidth: 200 }}>
                          <option value="">-- Chọn sản phẩm --</option>
                          {products.map(p => <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>)}
                        </select>
                      </td>
                      <td>
                        <input type="number" className="form-input" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} min="1" />
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeItem(i)} disabled={form.items.length <= 1} style={{ color: 'var(--danger-500)' }}>
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
            <label className="form-label">Ghi chú</label>
            <textarea className="form-textarea" value={form.note} onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))} placeholder="Ghi chú phiếu nhập (tùy chọn)" />
          </div>
        </div>

        <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => setForm({ supplierId: '', date: new Date().toISOString().split('T')[0], note: '', items: [{ productId: '', quantity: 1 }] })}>
            Xóa form
          </Button>
          <Button variant="primary" icon={Save} onClick={handleSubmit}>
            Xác nhận nhập kho
          </Button>
        </div>
      </div>
    </div>
  );
}
