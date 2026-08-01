export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 'var(--space-5)' }}>
      <div className="skeleton skeleton-title" style={{ width: '40%' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
      <div className="skeleton skeleton-text-sm" style={{ width: '50%' }}></div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="card stat-card">
      <div className="skeleton skeleton-avatar" style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)' }}></div>
      <div style={{ flex: 1 }}>
        <div className="skeleton skeleton-text-sm" style={{ width: '60%' }}></div>
        <div className="skeleton skeleton-title" style={{ width: '40%' }}></div>
      </div>
    </div>
  );
}

export function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i}>
          <div className="skeleton skeleton-text" style={{ width: `${60 + Math.random() * 30}%` }}></div>
        </td>
      ))}
    </tr>
  );
}

export function SkeletonChart() {
  return <div className="skeleton skeleton-chart"></div>;
}
