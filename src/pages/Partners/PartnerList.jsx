import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import SearchInput from '../../components/UI/SearchInput';
import EmptyState from '../../components/UI/EmptyState';
import ConfirmDialog from '../../components/UI/ConfirmDialog';
import Tooltip from '../../components/UI/Tooltip';
import PartnerForm from './PartnerForm';
import { Plus, Edit2, Trash2, Users, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PartnerList() {
  const { suppliers, customers, deleteSupplier, deleteCustomer } = useData();
  const { hasPermission } = useAuth();
  
  const [activeTab, setActiveTab] = useState('supplier');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const list = activeTab === 'supplier' ? suppliers : customers;
  const filtered = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

  const handleDelete = () => {
    if (!deleteTarget) return;
    if (activeTab === 'supplier') deleteSupplier(deleteTarget.id);
    else deleteCustomer(deleteTarget.id);
    toast.success(`Đã xóa "${deleteTarget.name}"`);
    setDeleteTarget(null);
  };

  const handleEdit = (partner) => {
    setEditTarget(partner);
    setShowForm(true);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Đối tác</h1>
        <div className="page-header-actions">
          {hasPermission('MANAGE_PARTNERS') && (
            <Button variant="primary" icon={Plus} onClick={() => { setEditTarget(null); setShowForm(true); }}>
              {activeTab === 'supplier' ? 'Thêm Nhà cung cấp' : 'Thêm Khách hàng'}
            </Button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="table-toolbar" style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant={activeTab === 'supplier' ? 'primary' : 'ghost'} onClick={() => setActiveTab('supplier')} icon={Truck}>Nhà cung cấp</Button>
            <Button variant={activeTab === 'customer' ? 'primary' : 'ghost'} onClick={() => setActiveTab('customer')} icon={Users}>Khách hàng</Button>
          </div>
          <div style={{ width: 300, marginLeft: 'auto' }}>
            <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên, SĐT..." />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={activeTab === 'supplier' ? Truck : Users}
            title={activeTab === 'supplier' ? "Không có nhà cung cấp nào" : "Không có khách hàng nào"}
            message="Bạn có thể thêm đối tác mới để quản lý."
          />
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Tên đối tác</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  {hasPermission('MANAGE_PARTNERS') && <th style={{ width: 100 }}>Thao tác</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.email || '-'}</td>
                    <td>{p.address || '-'}</td>
                    {hasPermission('MANAGE_PARTNERS') && (
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <Tooltip text="Chỉnh sửa">
                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => handleEdit(p)}>
                              <Edit2 size={15} />
                            </button>
                          </Tooltip>
                          <Tooltip text="Xóa">
                            <button className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--danger-500)' }} onClick={() => setDeleteTarget(p)}>
                              <Trash2 size={15} />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <PartnerForm
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditTarget(null); }}
        partner={editTarget}
        type={activeTab}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Xóa đối tác"
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"?`}
        confirmText="Xóa"
      />
    </div>
  );
}
