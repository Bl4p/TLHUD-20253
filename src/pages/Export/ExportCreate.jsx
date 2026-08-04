import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../../components/UI/Button';
import { Plus, Trash2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExportCreate() {
  const { products, customers, addExport } = useData();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState({
    customerId: '',
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
    if (!form.customerId) { toast.error('Vui lòng chọn khách hàng / bộ phận'); return; }
    const validItems = form.items.filter(it => it.productId && it.quantity > 0);
    if (validItems.length === 0) { toast.error('Vui lòng thêm ít nhất 1 sản phẩm'); return; }

    // Check stock
    for (const item of validItems) {
      const product = products.find(p => p.id === item.productId);
      if (product && item.quantity > product.stock) {
        toast.error(`"${product.name}" chỉ còn ${product.stock} trong kho`);
        return;
      }
    }

    const result = addExport({ ...form, items: validItems });
    addNotification({ type: 'export', title: 'Phiếu xuất mới', message: `${result.code} đã được tạo` });
    toast.success('🎉 Xuất kho thành công!');
    setForm({ customerId: '', date: new Date().toISOString().split('T')[0], note: '', items: [{ productId: '', quantity: 1 }] });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Tạo phiếu xuất kho</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label required">Khách hàng / Bộ phận</label>
              <select className="form-select" value={form.customerId} onChange={e => setForm(prev => ({ ...prev, customerId: e.target.value }))}>
                <option value="">-- Chọn --</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label required">Ngày xuất</label>
              <input type="date" className="form-input" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} />
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-3)' }}>
              <h4>Sản phẩm xuất</h4>
              <Button variant="outline" size="sm" icon={Plus} onClick={addItem}>Thêm dòng</Button>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th>Sản phẩm</th>
                    <th style={{ width: 100 }}>Tồn kho</th>
                    <th style={{ width: 120 }}>Số lượng</th>
                    <th style={{ width: 60 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, i) => {
                    const selectedProduct = products.find(p => p.id === item.productId);
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <select className="form-select" value={item.productId} onChange={e => updateItem(i, 'productId', e.target.value)} style={{ minWidth: 200 }}>
                            <option value="">-- Chọn sản phẩm --</option>
                            {products.filter(p => p.stock > 0).map(p => <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>)}
                          </select>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{selectedProduct ? selectedProduct.stock : '—'}</td>
                        <td>
                          <input type="number" className="form-input" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} min="1" max={selectedProduct?.stock || 999} />
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeItem(i)} disabled={form.items.length <= 1} style={{ color: 'var(--danger-500)' }}>
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
            <label className="form-label">Ghi chú</label>
            <textarea className="form-textarea" value={form.note} onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))} placeholder="Ghi chú phiếu xuất (tùy chọn)" />
          </div>
        </div>

        <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => setForm({ customerId: '', date: new Date().toISOString().split('T')[0], note: '', items: [{ productId: '', quantity: 1 }] })}>
            Xóa form
          </Button>
          <Button variant="primary" icon={Save} onClick={handleSubmit}>
            Xác nhận xuất kho
          </Button>
        </div>
      </div>
    </div>
  );
}
