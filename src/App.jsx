import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Products/ProductList';
import ProductDetail from './pages/Products/ProductDetail';
import ImportList from './pages/Import/ImportList';
import ImportCreate from './pages/Import/ImportCreate';
import ExportList from './pages/Export/ExportList';
import ExportCreate from './pages/Export/ExportCreate';
import InventoryCheck from './pages/Inventory/InventoryCheck';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import Profile from './pages/Profile/Profile';
import PartnerList from './pages/Partners/PartnerList';
import UserList from './pages/Users/UserList';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <MainLayout>{children}</MainLayout>;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
}

function RequirePermission({ children, permission }) {
  const { hasPermission } = useAuth();
  if (!hasPermission(permission)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        <Route path="/products" element={<ProtectedRoute><RequirePermission permission="VIEW_PRODUCTS"><ProductList /></RequirePermission></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><RequirePermission permission="VIEW_PRODUCTS"><ProductDetail /></RequirePermission></ProtectedRoute>} />
        
        <Route path="/import" element={<ProtectedRoute><ImportList /></ProtectedRoute>} />
        <Route path="/import/create" element={<ProtectedRoute><RequirePermission permission="CREATE_IMPORT"><ImportCreate /></RequirePermission></ProtectedRoute>} />
        
        <Route path="/export" element={<ProtectedRoute><ExportList /></ProtectedRoute>} />
        <Route path="/export/create" element={<ProtectedRoute><RequirePermission permission="CREATE_EXPORT"><ExportCreate /></RequirePermission></ProtectedRoute>} />
        
        <Route path="/inventory" element={<ProtectedRoute><RequirePermission permission="INVENTORY_CHECK"><InventoryCheck /></RequirePermission></ProtectedRoute>} />
        
        <Route path="/partners" element={<ProtectedRoute><PartnerList /></ProtectedRoute>} />

        <Route path="/reports" element={<ProtectedRoute><RequirePermission permission="VIEW_REPORTS"><Reports /></RequirePermission></ProtectedRoute>} />
        
        <Route path="/settings" element={<ProtectedRoute><RequirePermission permission="SETTINGS"><Settings /></RequirePermission></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><RequirePermission permission="MANAGE_USERS"><UserList /></RequirePermission></ProtectedRoute>} />
        
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
