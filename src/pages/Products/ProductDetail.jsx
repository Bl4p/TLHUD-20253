import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { StockBadge } from '../../components/UI/Badge';
import Button from '../../components/UI/Button';
import ProductForm from './ProductForm';
import { ArrowLeft, Edit2 } from 'lucide-react';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, categories, imports, exports } = useData();
  const { hasPermission } = useAuth();
  const product = getProduct(id);
  const [showEditForm, setShowEditForm] = useState(false);

  if (!product) {
    return (
      <div className="empty-state">
        <h3>Sản phẩm không tồn tại</h3>
        <p>Sản phẩm đã bị xóa hoặc không hợp lệ</p>
        <Button variant="primary" onClick={() => navigate('/products')}>Quay lại danh sách</Button>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const formatPrice = (n) => new Intl.NumberFormat('vi-VN').format(n) + '₫';

  const history = [
    ...imports.flatMap(imp => imp.items.filter(it => it.productId === id).map(it => ({
      type: 'import',
      code: imp.code,
      date: imp.date,
      quantity: it.quantity,
      price: it.price,
      status: imp.status
    }))),
    ...exports.flatMap(exp => exp.items.filter(it => it.productId === id).map(it => ({
      type: 'export',
      code: exp.code,
      date: exp.date,
      quantity: it.quantity,
      price: it.price,
      status: exp.status
    })))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button className="btn btn-ghost btn-icon" onClick={() => navigate('/products')}>
            <ArrowLeft size={20} />
          </button>
          <h1>Chi tiết sản phẩm</h1>
        </div>
        {hasPermission('MANAGE_PRODUCT') && (
          <Button variant="primary" icon={Edit2} onClick={() => setShowEditForm(true)}>Chỉnh sửa</Button>
        )}
      </div>

      <div className="product-detail-grid">


        <div className="card">
          <div className="card-body">
            <div className="product-detail-header">
              <StockBadge stock={product.stock} minStock={product.minStock} />
              <span className="product-sku">{product.sku}</span>
            </div>

            <h2 className="product-detail-name">{product.name}</h2>

            <div className="product-info-grid">
              <div className="product-info-item">
                <span className="product-info-label">Danh mục</span>
                <span className="product-info-value">{category?.icon} {category?.name}</span>
              </div>
              <div className="product-info-item">
                <span className="product-info-label">Đơn vị tính</span>
                <span className="product-info-value">{product.unit}</span>
              </div>
              <div className="product-info-item">
                <span className="product-info-label">Số lượng tồn</span>
                <span className="product-info-value" style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: product.stock <= product.minStock ? 'var(--danger-500)' : 'var(--success-500)' }}>
                  {product.stock}
                </span>
              </div>
              <div className="product-info-item">
                <span className="product-info-label">Tồn kho tối thiểu</span>
                <span className="product-info-value">{product.minStock}</span>
              </div>
              <div className="product-info-item">
                <span className="product-info-label">Giá nhập</span>
                <span className="product-info-value">{formatPrice(product.importPrice)}</span>
              </div>
              <div className="product-info-item">
                <span className="product-info-label">Giá bán</span>
                <span className="product-info-value" style={{ color: 'var(--primary-500)', fontWeight: 600, fontSize: 'var(--font-lg)' }}>
                  {formatPrice(product.sellPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h3>Lịch sử giao dịch</h3>
        </div>
        {history.length === 0 ? (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            Chưa có giao dịch nhập/xuất nào cho sản phẩm này.
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Loại phiếu</th>
                  <th>Mã phiếu</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} style={{ opacity: h.status === 'pending' ? 0.6 : 1 }}>
                    <td>{new Date(h.date).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <span className={`badge ${h.type === 'import' ? 'badge-success' : 'badge-warning'}`}>
                        {h.type === 'import' ? 'Nhập kho' : 'Xuất kho'}
                      </span>
                      {h.status === 'pending' && <span style={{ marginLeft: 8, fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>(Chờ duyệt)</span>}
                    </td>
                    <td style={{ fontFamily: 'monospace' }}>{h.code}</td>
                    <td style={{ fontWeight: 'bold', color: h.type === 'import' ? 'var(--success-600)' : 'var(--warning-600)' }}>
                      {h.type === 'import' ? '+' : '-'}{h.quantity}
                    </td>
                    <td>{formatPrice(h.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        product={product}
      />
    </div>
  );
}
