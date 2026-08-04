import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import SearchInput from '../../components/UI/SearchInput';
import UserForm from './UserForm';
import { Plus, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserList() {
  const { users, deleteUser } = useData();
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (id === currentUser.id) {
      toast.error('Không thể xóa tài khoản đang đăng nhập!');
      return;
    }
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      deleteUser(id);
      toast.success('Đã xóa nhân viên');
    }
  };

  const openEdit = (u) => {
    setEditingUser(u);
    setShowForm(true);
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Admin': return 'badge-danger';
      case 'QL kho': return 'badge-primary';
      case 'Kế toán': return 'badge-warning';
      default: return 'badge-success';
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Quản lý nhân viên</h1>
          <p className="page-subtitle">Thêm, sửa, xóa và phân quyền người dùng</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => { setEditingUser(null); setShowForm(true); }}>
          Thêm nhân viên
        </Button>
      </div>

      <div className="card">
        <div style={{ padding: 'var(--space-4)' }}>
          <div style={{ maxWidth: 320 }}>
            <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên, email..." />
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Tên nhân viên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th style={{ width: 100 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td>
                    <span className={`badge ${getRoleBadgeClass(u.role)}`}>
                      {u.role === 'Admin' && <ShieldAlert size={12} style={{ marginRight: 4 }} />}
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="btn btn-icon btn-ghost" onClick={() => openEdit(u)} title="Sửa">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-icon btn-ghost" style={{ color: 'var(--danger-500)' }} onClick={() => handleDelete(u.id)} title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-tertiary)' }}>
                    Không tìm thấy nhân viên nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserForm 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        user={editingUser} 
      />
    </div>
  );
}
