import { useNotifications } from '../../contexts/NotificationContext';
import { AlertTriangle, ArrowDownToLine, ArrowUpFromLine, CheckCheck } from 'lucide-react';

const iconMap = {
  alert: { icon: AlertTriangle, bg: 'rgba(245, 158, 11, 0.12)', color: 'var(--warning-500)' },
  import: { icon: ArrowDownToLine, bg: 'rgba(34, 197, 94, 0.12)', color: 'var(--success-500)' },
  export: { icon: ArrowUpFromLine, bg: 'rgba(59, 130, 246, 0.12)', color: 'var(--info-500)' },
};

export default function NotificationPanel({ onClose }) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="notification-panel">
      <div className="notification-panel-header">
        <h4>Thông báo</h4>
        <button
          className="btn btn-ghost btn-sm"
          onClick={markAllAsRead}
          style={{ gap: '4px' }}
        >
          <CheckCheck size={14} /> Đọc tất cả
        </button>
      </div>
      <div className="notification-list">
        {notifications.map(noti => {
          const config = iconMap[noti.type] || iconMap.alert;
          const NotiIcon = config.icon;
          return (
            <div
              key={noti.id}
              className={`notification-item ${noti.read ? '' : 'unread'}`}
              onClick={() => markAsRead(noti.id)}
            >
              <div
                className="notification-item-icon"
                style={{ background: config.bg, color: config.color }}
              >
                <NotiIcon size={16} />
              </div>
              <div className="notification-item-content">
                <p><strong>{noti.title}</strong></p>
                <p style={{ color: 'var(--text-secondary)' }}>{noti.message}</p>
                <span>{noti.time}</span>
              </div>
              {!noti.read && <div className="notification-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
