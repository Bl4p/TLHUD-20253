import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import { LogOut, Save, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import './Profile.css';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.newPass || !passwordForm.confirm) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }
    toast.success('Đổi mật khẩu thành công (demo)');
    setPasswordForm({ current: '', newPass: '', confirm: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Hồ sơ cá nhân</h1>
      </div>

      <div className="profile-grid">
        {/* Profile Card */}
        <div className="card profile-card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <button className="profile-avatar-edit" title="Đổi ảnh đại diện">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="profile-name">{user?.name || 'Admin'}</h2>
            <p className="profile-role">{user?.role || 'Quản trị viên'}</p>
            <p className="profile-email">{user?.email || 'admin@warehouse.vn'}</p>

            <Button variant="danger" icon={LogOut} onClick={handleLogout} style={{ marginTop: 'var(--space-6)', width: '100%' }}>
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div className="card">
          <div className="card-header">
            <h3>Đổi mật khẩu</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
              <div className="form-group">
                <label className="form-label">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordForm.current}
                  onChange={e => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordForm.newPass}
                  onChange={e => setPasswordForm(prev => ({ ...prev, newPass: e.target.value }))}
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordForm.confirm}
                  onChange={e => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              <Button variant="primary" icon={Save} onClick={handleChangePassword}>
                Cập nhật mật khẩu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
