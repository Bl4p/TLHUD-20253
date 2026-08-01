import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import SearchInput from '../../components/UI/SearchInput';
import Pagination from '../../components/UI/Pagination';
import Badge from '../../components/UI/Badge';
import { Plus, CheckCircle, Clock } from 'lucide-react';

export default function ExportList() {
  const { exports: exportList, customers, products, approveExport } = useData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = exportList.filter(exp => {
    if (!search) return true;
    const q = search.toLowerCase();
    const customer = customers.find(c => c.id === exp.customerId);
    return exp.code.toLowerCase().includes(q) || customer?.name.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const getCustomerName = (id) => customers.find(c => c.id === id)?.name || '';
  const getProductNames = (items) => items.map(it => {
    const p = products.find(pr => pr.id === it.productId);
    return p ? `${p.name} (x${it.quantity})` : '';
  }).filter(Boolean).join(', ');

  return (
    <div>
      <div className="page-header">
        <h1>Phiếu xuất kho</h1>
        {hasPermission('CREATE_EXPORT') && (
          <Button variant="primary" icon={Plus} onClick={() => navigate('/export/create')}>
            Tạo phiếu xuất
          </Button>
        )}
      </div>

      <div className="card">
        <div style={{ padding: 'var(--space-4)' }}>
          <div style={{ maxWidth: 320 }}>
            <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Tìm theo mã, KH..." />
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Khách hàng / Bộ phận</th>
                <th>Ngày xuất</th>
                <th>Sản phẩm</th>
                <th>Trạng thái</th>
                {hasPermission('APPROVE_TICKET') && <th style={{ width: 100 }}>Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {paginated.map(exp => (
                <tr key={exp.id}>
                  <td><Badge variant="success">{exp.code}</Badge></td>
                  <td style={{ fontWeight: 500 }}>{getCustomerName(exp.customerId)}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{exp.date}</td>
                  <td style={{ maxWidth: 250 }}>
                    <span className="truncate" style={{ display: 'block' }}>{getProductNames(exp.items)}</span>
                  </td>
                  <td>
                    {exp.status === 'completed' ? (
                      <span className="badge badge-success"><CheckCircle size={12} style={{ marginRight: 4 }}/> Hoàn thành</span>
                    ) : (
                      <span className="badge badge-warning"><Clock size={12} style={{ marginRight: 4 }}/> Chờ duyệt</span>
                    )}
                  </td>
                  {hasPermission('APPROVE_TICKET') && (
                    <td>
                      {exp.status !== 'completed' && (
                        <Button variant="primary" size="sm" onClick={() => approveExport(exp.id)}>
                          Duyệt
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span className="table-footer-info">{filtered.length} phiếu xuất</span>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
