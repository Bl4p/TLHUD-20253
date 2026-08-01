import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ icon: Icon = PackageOpen, title = 'Không có dữ liệu', message, actionLabel, onAction }) {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state-icon">
        <Icon size={36} />
      </div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
