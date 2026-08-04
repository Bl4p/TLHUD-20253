import { Search, X } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Tìm kiếm...' }) {
  return (
    <div className="search-input-wrapper">
      <Search size={16} className="search-icon" />
      <input
        type="text"
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
