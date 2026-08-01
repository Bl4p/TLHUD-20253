import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels = {
  '': 'Dashboard',
  'products': 'Sản phẩm',
  'import': 'Nhập kho',
  'export': 'Xuất kho',
  'inventory': 'Kiểm kê',
  'reports': 'Báo cáo',
  'settings': 'Cài đặt',
  'profile': 'Hồ sơ cá nhân',
  'create': 'Tạo mới',
  'detail': 'Chi tiết',
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb-item">
        <Home size={14} />
        <span>Dashboard</span>
      </Link>
      {pathnames.map((segment, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;
        const label = routeLabels[segment] || segment;

        return (
          <span key={routeTo} className="breadcrumb-segment">
            <ChevronRight size={14} className="breadcrumb-separator" />
            {isLast ? (
              <span className="breadcrumb-item current">{label}</span>
            ) : (
              <Link to={routeTo} className="breadcrumb-item">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
