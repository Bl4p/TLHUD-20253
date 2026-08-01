import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, PanelLeftClose, PanelLeft, Globe } from 'lucide-react';
import './Settings.css';

const accentColors = [
  { id: 'default', color: '#0ea5e9', name: 'Sky Blue' },
  { id: 'blue', color: '#3b82f6', name: 'Blue' },
  { id: 'purple', color: '#8b5cf6', name: 'Purple' },
  { id: 'emerald', color: '#10b981', name: 'Emerald' },
  { id: 'rose', color: '#f43f5e', name: 'Rose' },
  { id: 'amber', color: '#f59e0b', name: 'Amber' },
];

export default function Settings() {
  const { isDark, toggleDarkMode, sidebarCollapsed, toggleSidebar, accent, setAccent, language, setLanguage } = useTheme();

  return (
    <div>
      <div className="page-header">
        <h1>Cài đặt giao diện</h1>
      </div>

      <div className="settings-grid">
        {/* Dark Mode */}
        <div className="card settings-card">
          <div className="settings-card-content">
            <div className="settings-card-icon">
              {isDark ? <Moon size={24} /> : <Sun size={24} />}
            </div>
            <div className="settings-card-info">
              <h4>Chế độ {isDark ? 'Tối' : 'Sáng'}</h4>
              <p>Chuyển đổi giữa giao diện sáng và tối</p>
            </div>
            <div
              className={`toggle ${isDark ? 'active' : ''}`}
              onClick={toggleDarkMode}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="card settings-card">
          <div className="settings-card-content">
            <div className="settings-card-icon">
              {sidebarCollapsed ? <PanelLeftClose size={24} /> : <PanelLeft size={24} />}
            </div>
            <div className="settings-card-info">
              <h4>Thu gọn Sidebar</h4>
              <p>Hiển thị sidebar ở chế độ thu gọn (chỉ icon)</p>
            </div>
            <div
              className={`toggle ${sidebarCollapsed ? 'active' : ''}`}
              onClick={toggleSidebar}
            />
          </div>
        </div>

        {/* Language */}
        <div className="card settings-card">
          <div className="settings-card-content">
            <div className="settings-card-icon">
              <Globe size={24} />
            </div>
            <div className="settings-card-info">
              <h4>Ngôn ngữ</h4>
              <p>Chọn ngôn ngữ hiển thị (UI only)</p>
            </div>
            <select
              className="form-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ width: 140 }}
            >
              <option value="vi">🇻🇳 Tiếng Việt</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>
        </div>

        {/* Accent Color */}
        <div className="card settings-card">
          <div className="settings-card-content" style={{ flexWrap: 'wrap' }}>
            <div className="settings-card-icon" style={{ background: 'rgba(14, 165, 233, 0.12)', color: 'var(--primary-500)' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--primary-500)' }} />
            </div>
            <div className="settings-card-info">
              <h4>Màu chủ đạo</h4>
              <p>Tùy chỉnh màu chủ đạo của giao diện</p>
            </div>
          </div>
          <div style={{ padding: '0 var(--space-6) var(--space-5)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            {accentColors.map(c => (
              <button
                key={c.id}
                className={`color-swatch ${accent === c.id ? 'active' : ''}`}
                style={{ background: c.color }}
                onClick={() => setAccent(c.id)}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
