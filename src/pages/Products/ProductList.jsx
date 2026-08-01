import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import SearchInput from '../../components/UI/SearchInput';
import Pagination from '../../components/UI/Pagination';
import { StockBadge } from '../../components/UI/Badge';
import EmptyState from '../../components/UI/EmptyState';
import ConfirmDialog from '../../components/UI/ConfirmDialog';
import Tooltip from '../../components/UI/Tooltip';
import ProductForm from './ProductForm';
import { Plus, Edit2, Trash2, Eye, ArrowUpDown, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 10;

export default function ProductList() {
  const { products, categories, deleteProduct } = useData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (categoryFilter) {
      result = result.filter(p => p.categoryId === categoryFilter);
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name, 'vi');
      else if (sortField === 'stock') cmp = a.stock - b.stock;
      else if (sortField === 'price') cmp = a.sellPrice - b.sellPrice;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [products, search, categoryFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    toast.success(`Đã xóa "${deleteTarget.name}"`);
    setDeleteTarget(null);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const formatPrice = (n) => new Intl.NumberFormat('vi-VN').format(n) + '₫';

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || '';

  return (
    <div>
      <div className="page-header">
        <h1>Quản lý Sản phẩm</h1>
        <div className="page-header-actions">
          {hasPermission('MANAGE_PRODUCT') && (
            <Button variant="primary" icon={Plus} onClick={() => { setEditProduct(null); setShowForm(true); }}>
              Thêm sản phẩm
            </Button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="table-toolbar" style={{ padding: 'var(--space-4)' }}>
          <div className="table-toolbar-left">
            <div style={{ width: 280 }}>
              <SearchInput value={search} onChange={(v) => { setSearch(v); setCurrentPage(1); }} placeholder="Tìm theo tên, SKU..." />
            </div>
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              style={{ width: 180 }}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {paginated.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Không tìm thấy sản phẩm"
            message="Thử thay đổi bộ lọc hoặc thêm sản phẩm mới"
            actionLabel="Thêm sản phẩm"
            onAction={() => { setEditProduct(null); setShowForm(true); }}
          />
        ) : (
          <>
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th className="sortable" onClick={() => handleSort('name')}>
                      Sản phẩm {sortField === 'name' && <ArrowUpDown size={12} style={{ marginLeft: 4 }} />}
                    </th>
                    <th>SKU</th>
                    <th>Danh mục</th>
                    <th className="sortable" onClick={() => handleSort('stock')}>
                      Tồn kho {sortField === 'stock' && <ArrowUpDown size={12} style={{ marginLeft: 4 }} />}
                    </th>
                    <th className="sortable" onClick={() => handleSort('price')}>
                      Giá bán {sortField === 'price' && <ArrowUpDown size={12} style={{ marginLeft: 4 }} />}
                    </th>
                    <th>Trạng thái</th>
                    <th style={{ width: 120 }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(product => (
                    <tr key={product.id}>
                      <td>
                        <span style={{ fontWeight: 500, cursor: 'pointer', color: 'var(--primary-500)' }} onClick={() => navigate(`/products/${product.id}`)}>
                          {product.name}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 'var(--font-xs)' }}>{product.sku}</td>
                      <td>{getCategoryName(product.categoryId)}</td>
                      <td><strong>{product.stock}</strong> <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-xs)' }}>{product.unit}</span></td>
                      <td>{formatPrice(product.sellPrice)}</td>
                      <td><StockBadge stock={product.stock} minStock={product.minStock} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <Tooltip text="Xem chi tiết">
                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => navigate(`/products/${product.id}`)}>
                              <Eye size={15} />
                            </button>
                          </Tooltip>
                          {hasPermission('MANAGE_PRODUCT') && (
                            <Tooltip text="Chỉnh sửa">
                              <button className="btn btn-ghost btn-icon btn-sm" onClick={() => handleEdit(product)}>
                                <Edit2 size={15} />
                              </button>
                            </Tooltip>
                          )}
                          {hasPermission('DELETE_PRODUCT') && (
                            <Tooltip text="Xóa">
                              <button className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--danger-500)' }} onClick={() => setDeleteTarget(product)}>
                                <Trash2 size={15} />
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span className="table-footer-info">
                Hiển thị {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} / {filtered.length} sản phẩm
              </span>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </>
        )}
      </div>

      <ProductForm
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditProduct(null); }}
        product={editProduct}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Xóa sản phẩm"
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
      />
    </div>
  );
}
