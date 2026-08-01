import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import SearchInput from '../../components/UI/SearchInput';
import Pagination from '../../components/UI/Pagination';
import Badge from '../../components/UI/Badge';
import { Plus, CheckCircle, Clock } from 'lucide-react';

export default function ImportList() {
  const { imports, suppliers, products, approveImport } = useData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = imports.filter(imp => {
    if (!search) return true;
    const q = search.toLowerCase();
    const supplier = suppliers.find(s => s.id === imp.supplierId);
    return imp.code.toLowerCase().includes(q) || supplier?.name.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const getSupplierName = (id) => suppliers.find(s => s.id === id)?.name || '';
  const getProductNames = (items) => items.map(it => {
    const p = products.find(pr => pr.id === it.productId);
    return p ? `${p.name} (x${it.quantity})` : '';
  }).filter(Boolean).join(', ');

  return (
    <div>
      <div className="page-header">
        <h1>Phiếu nhập kho</h1>
        {hasPermission('CREATE_IMPORT') && (
          <Button variant="primary" icon={Plus} onClick={() => navigate('/import/create')}>
            Tạo phiếu nhập
          </Button>
        )}
      </div>

      <div className="card">
        <div style={{ padding: 'var(--space-4)' }}>
          <div style={{ maxWidth: 320 }}>
            <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Tìm theo mã, NCC..." />
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Nhà cung cấp</th>
                <th>Ngày nhập</th>
                <th>Sản phẩm</th>
                <th>Trạng thái</th>
                {hasPermission('APPROVE_TICKET') && <th style={{ width: 100 }}>Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {paginated.map(imp => (
                <tr key={imp.id}>
                  <td><Badge variant="info">{imp.code}</Badge></td>
                  <td style={{ fontWeight: 500 }}>{getSupplierName(imp.supplierId)}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{imp.date}</td>
                  <td style={{ maxWidth: 250 }}>
                    <span className="truncate" style={{ display: 'block' }}>{getProductNames(imp.items)}</span>
                  </td>
                  <td>
                    {imp.status === 'completed' ? (
                      <span className="badge badge-success"><CheckCircle size={12} style={{ marginRight: 4 }}/> Hoàn thành</span>
                    ) : (
                      <span className="badge badge-warning"><Clock size={12} style={{ marginRight: 4 }}/> Chờ duyệt</span>
                    )}
                  </td>
                  {hasPermission('APPROVE_TICKET') && (
                    <td>
                      {imp.status !== 'completed' && (
                        <Button variant="primary" size="sm" onClick={() => approveImport(imp.id)}>
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
          <span className="table-footer-info">{filtered.length} phiếu nhập</span>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
