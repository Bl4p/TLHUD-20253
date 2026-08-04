import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Xác nhận', loading = false }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-body" style={{ padding: '2rem' }}>
          <div className="confirm-dialog-icon danger">
            <AlertTriangle size={28} />
          </div>
          <h3>{title || 'Xác nhận xóa'}</h3>
          <p>{message || 'Bạn có chắc chắn muốn thực hiện hành động này? Hành động không thể hoàn tác.'}</p>
          <div className="confirm-dialog-actions">
            <Button variant="secondary" onClick={onClose} disabled={loading}>Hủy</Button>
            <Button variant="danger" onClick={onConfirm} loading={loading}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
