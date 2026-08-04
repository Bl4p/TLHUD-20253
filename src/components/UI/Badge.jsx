export default function Badge({ variant = 'neutral', children }) {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
}

export function StockBadge({ stock, minStock }) {
  if (stock === 0) return <Badge variant="danger">Hết hàng</Badge>;
  if (stock <= minStock) return <Badge variant="warning">Sắp hết</Badge>;
  return <Badge variant="success">Còn hàng</Badge>;
}
