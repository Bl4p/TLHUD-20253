import { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import toast from 'react-hot-toast';

const defaultForm = {
  name: '',
  email: '',
  password: '',
  role: 'NV kho'
};

const roles = ['Admin', 'QL kho', 'NV kho', 'Kế toán'];

export default function UserForm({ isOpen, onClose, user }) {
  const { addUser, updateUser } = useData();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const isEdit = !!user;

  useEffect(() => {
    if (isOpen) {
      setForm(user || defaultForm);
      setErrors({});
    }
  }, [isOpen, user]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập tên nhân viên';
    if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!form.password.trim() && !isEdit) newErrors.password = 'Vui lòng nhập mật khẩu';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    if (isEdit) {
      updateUser(user.id, form);
      toast.success('Cập nhật nhân viên thành công');
    } else {
      addUser(form);
      toast.success('Thêm nhân viên thành công');
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Hủy</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEdit ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label required">Tên nhân viên</label>
        <input 
          className={`form-input ${errors.name ? 'error' : ''}`}
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Nhập tên nhân viên"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label required">Email đăng nhập</label>
        <input 
          type="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
          placeholder="Nhập email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className={`form-label ${isEdit ? '' : 'required'}`}>Mật khẩu {isEdit && '(Bỏ trống nếu không đổi)'}</label>
        <input 
          type="password"
          className={`form-input ${errors.password ? 'error' : ''}`}
          value={form.password}
          onChange={e => handleChange('password', e.target.value)}
          placeholder="Nhập mật khẩu"
        />
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label className="form-label required">Vai trò (Phân quyền)</label>
        <select 
          className="form-select"
          value={form.role}
          onChange={e => handleChange('role', e.target.value)}
        >
          {roles.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
    </Modal>
  );
}
