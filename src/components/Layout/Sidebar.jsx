import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Package, ArrowDownToLine, ArrowUpFromLine,
  ClipboardCheck, BarChart3, Settings, ChevronLeft, ChevronRight,
  Warehouse, X, Users, UserCog
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, permission: 'VIEW_DASHBOARD' },
  { path: '/products', label: 'Sản phẩm', icon: Package, permission: 'VIEW_PRODUCTS' },
  { path: '/import', label: 'Nhập kho', icon: ArrowDownToLine },
  { path: '/export', label: 'Xuất kho', icon: ArrowUpFromLine },
  { path: '/inventory', label: 'Kiểm kê', icon: ClipboardCheck, permission: 'INVENTORY_CHECK' },
  { path: '/partners', label: 'Đối tác', icon: Users, permission: 'MANAGE_PARTNERS' },
  { path: '/users', label: 'Nhân sự', icon: UserCog, permission: 'MANAGE_USERS' },
  { path: '/reports', label: 'Báo cáo', icon: BarChart3, permission: 'VIEW_REPORTS' },
  { path: '/settings', label: 'Cài đặt', icon: Settings, permission: 'SETTINGS' },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const { sidebarCollapsed, toggleSidebar } = useTheme();
  const { user, hasPermission } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Warehouse size={28} />
            {!sidebarCollapsed && <span>WMS</span>}
          </div>
          <button className="sidebar-collapse-btn desktop-only" onClick={toggleSidebar}>
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          <button className="sidebar-close-btn mobile-only" onClick={onMobileClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.filter(item => !item.permission || user?.role === 'Admin' || (user && hasPermission(item.permission))).map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={onMobileClose}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            {!sidebarCollapsed && (
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">{user?.name || 'Admin'}</p>
                <span className="sidebar-user-role">{user?.role || 'Quản trị viên'}</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
