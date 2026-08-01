import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Warehouse, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Button from '../../components/UI/Button';
import { demoUsers } from '../../data/mockData';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email không hợp lệ';
    if (!password.trim()) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 3) newErrors.password = 'Mật khẩu tối thiểu 3 ký tự';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setErrors({ form: res.error });
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <Warehouse size={32} />
            </div>
            <h1>WMS</h1>
            <p>Hệ thống Quản lý Kho hàng</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <div className="login-input-wrapper">
                <Mail size={16} className="login-input-icon" />
                <input
                  id="email"
                  type="email"
                  className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                  placeholder="admin@warehouse.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              {touched.email && errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Mật khẩu</label>
              <div className="login-input-wrapper">
                <Lock size={16} className="login-input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${touched.password && errors.password ? 'error' : ''}`}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>

            <div className="login-options">
              <label className="checkbox-wrapper" onClick={() => setRemember(!remember)}>
                <div className={`checkbox ${remember ? 'checked' : ''}`}>
                  {remember && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="checkbox-label">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="login-forgot">Quên mật khẩu?</a>
            </div>

            {errors.form && (
              <div className="form-error" style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>{errors.form}</div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="login-submit-btn"
            >
              Đăng nhập
            </Button>
          </form>

          <div className="login-footer" style={{ marginTop: 'var(--space-6)' }}>
            <p style={{ marginBottom: 'var(--space-3)' }}>Tài khoản Demo:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {demoUsers.map(u => (
                <button
                  key={u.email}
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => { setEmail(u.email); setPassword(u.password); }}
                  style={{ justifyContent: 'flex-start', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <span style={{ fontWeight: 500, color: 'var(--primary-400)', width: '70px', textAlign: 'left' }}>{u.role}</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{u.email} / {u.password}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
