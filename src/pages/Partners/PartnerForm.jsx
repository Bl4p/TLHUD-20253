import { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import toast from 'react-hot-toast';

const defaultForm = { name: '', phone: '', email: '', address: '' };

export default function PartnerForm({ isOpen, onClose, partner, type }) {
  const { addSupplier, updateSupplier, addCustomer, updateCustomer } = useData();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const isEdit = !!partner;
  const isSupplier = type === 'supplier';

  useEffect(() => {
    if (partner) setForm({ ...defaultForm, ...partner });
    else setForm(defaultForm);
    setErrors({});
  }, [partner, isOpen]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập tên';
    if (!form.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    if (isEdit) {
      if (isSupplier) updateSupplier(partner.id, form);
      else updateCustomer(partner.id, form);
      toast.success('Cập nhật thành công!');
    } else {
      if (isSupplier) addSupplier(form);
      else addCustomer(form);
      toast.success('Thêm mới thành công!');
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? `Sửa ${isSupplier ? 'Nhà cung cấp' : 'Khách hàng'}` : `Thêm ${isSupplier ? 'Nhà cung cấp' : 'Khách hàng'} mới`}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Hủy</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEdit ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </>
      }
    >
      <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="form-group">
          <label className="form-label required">Tên đối tác</label>
          <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Nhập tên..." />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label required">Số điện thoại</label>
          <input className={`form-input ${errors.phone ? 'error' : ''}`} value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="Nhập SĐT..." />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="Nhập email (nếu có)" />
        </div>
        <div className="form-group">
          <label className="form-label">Địa chỉ</label>
          <textarea className="form-textarea" value={form.address} onChange={e => handleChange('address', e.target.value)} placeholder="Nhập địa chỉ..." />
        </div>
      </div>
    </Modal>
  );
}
