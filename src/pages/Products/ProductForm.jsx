import { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import { units } from '../../data/mockData';
import toast from 'react-hot-toast';

const defaultForm = {
  name: '', sku: '', categoryId: '', unit: 'Cái',
  stock: 0, minStock: 5, importPrice: 0, sellPrice: 0,
};

export default function ProductForm({ isOpen, onClose, product }) {
  const { addProduct, updateProduct, categories } = useData();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const isEdit = !!product;

  useEffect(() => {
    if (product) setForm({ ...defaultForm, ...product });
    else setForm(defaultForm);
    setErrors({});
  }, [product, isOpen]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập tên sản phẩm';
    if (!form.sku.trim()) e.sku = 'Vui lòng nhập mã SKU';
    if (!form.categoryId) e.categoryId = 'Vui lòng chọn danh mục';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const data = {
      ...form,
      stock: Number(form.stock),
      minStock: Number(form.minStock),
      importPrice: Number(form.importPrice),
      sellPrice: Number(form.sellPrice),
    };

    if (isEdit) {
      updateProduct(product.id, data);
      toast.success('Cập nhật sản phẩm thành công!');
    } else {
      addProduct(data);
      toast.success('Thêm sản phẩm mới thành công!');
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Hủy</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEdit ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </>
      }
    >
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label required">Tên sản phẩm</label>
          <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Nhập tên sản phẩm" />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label required">Mã SKU</label>
          <input className={`form-input ${errors.sku ? 'error' : ''}`} value={form.sku} onChange={e => handleChange('sku', e.target.value)} placeholder="VD: DT-007" />
          {errors.sku && <span className="form-error">{errors.sku}</span>}
        </div>
        <div className="form-group">
          <label className="form-label required">Danh mục</label>
          <select className={`form-select ${errors.categoryId ? 'error' : ''}`} value={form.categoryId} onChange={e => handleChange('categoryId', e.target.value)}>
            <option value="">-- Chọn danh mục --</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
          {errors.categoryId && <span className="form-error">{errors.categoryId}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Đơn vị tính</label>
          <select className="form-select" value={form.unit} onChange={e => handleChange('unit', e.target.value)}>
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Số lượng tồn</label>
          <input type="number" className="form-input" value={form.stock} onChange={e => handleChange('stock', e.target.value)} min="0" />
        </div>
        <div className="form-group">
          <label className="form-label">Tồn kho tối thiểu</label>
          <input type="number" className="form-input" value={form.minStock} onChange={e => handleChange('minStock', e.target.value)} min="0" />
        </div>
        <div className="form-group">
          <label className="form-label">Giá nhập (₫)</label>
          <input type="number" className="form-input" value={form.importPrice} onChange={e => handleChange('importPrice', e.target.value)} min="0" />
        </div>
        <div className="form-group">
          <label className="form-label">Giá bán (₫)</label>
          <input type="number" className="form-input" value={form.sellPrice} onChange={e => handleChange('sellPrice', e.target.value)} min="0" />
        </div>
      </div>
    </Modal>
  );
}
