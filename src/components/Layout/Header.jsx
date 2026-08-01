import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationPanel from '../Notification/NotificationPanel';
import {
  Menu, Bell, Sun, Moon, User, Settings, LogOut, Search
} from 'lucide-react';
import './Header.css';

export default function Header({ onMenuClick }) {
  const { isDark, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notiRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="btn btn-ghost btn-icon mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className={`header-search ${searchFocused ? 'focused' : ''}`}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      <div className="header-right">
        <button
          className="btn btn-ghost btn-icon"
          onClick={toggleDarkMode}
          title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="notification-badge" ref={notiRef}>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
          >
            <Bell size={20} />
          </button>
          {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
          {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
        </div>

        <div className="dropdown" ref={userRef}>
          <button
            className="header-user-btn"
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
          >
            <div className="header-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <span className="header-user-name">{user?.name || 'Admin'}</span>
          </button>
          {showUserMenu && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => { setShowUserMenu(false); navigate('/profile'); }}>
                <User size={16} /> Hồ sơ cá nhân
              </button>
              <button className="dropdown-item" onClick={() => { setShowUserMenu(false); navigate('/settings'); }}>
                <Settings size={16} /> Cài đặt
              </button>
              <div className="dropdown-divider" />
              <button className="dropdown-item danger" onClick={handleLogout}>
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
