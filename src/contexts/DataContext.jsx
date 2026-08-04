import { createContext, useContext, useState, useCallback } from 'react';
import { initialProducts, initialImports, initialExports, categories, suppliers, customers, demoUsers } from '../data/mockData';

const DataContext = createContext(null);

let nextProductId = 21;
let nextImportId = 11;
let nextExportId = 11;
let nextUserId = 5;

export function DataProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [imports, setImports] = useState(initialImports);
  const [exports, setExports] = useState(initialExports);
  const [suppliersList, setSuppliersList] = useState(suppliers);
  const [customersList, setCustomersList] = useState(customers);
  const [users, setUsers] = useState(demoUsers);

  // ---- Products ----
  const addProduct = useCallback((product) => {
    const newProduct = { ...product, id: `p-${nextProductId++}` };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const getProduct = useCallback((id) => {
    return products.find(p => p.id === id);
  }, [products]);

  // ---- Imports ----
  const addImport = useCallback((importData) => {
    const newImport = {
      ...importData,
      id: `imp-${nextImportId++}`,
      code: `PN-2026-${String(nextImportId).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setImports(prev => [newImport, ...prev]);
    return newImport;
  }, []);

  const approveImport = useCallback((id) => {
    const imp = imports.find(i => i.id === id);
    if (!imp || imp.status === 'completed') return;
    
    setImports(prev => prev.map(i => i.id === id ? { ...i, status: 'completed' } : i));
    
    // Update stock
    imp.items.forEach(item => {
      setProducts(pList => pList.map(p =>
        p.id === item.productId ? { ...p, stock: p.stock + item.quantity } : p
      ));
    });
  }, [imports]);

  // ---- Exports ----
  const addExport = useCallback((exportData) => {
    const newExport = {
      ...exportData,
      id: `exp-${nextExportId++}`,
      code: `PX-2026-${String(nextExportId).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setExports(prev => [newExport, ...prev]);
    return newExport;
  }, []);

  const approveExport = useCallback((id) => {
    const exp = exports.find(e => e.id === id);
    if (!exp || exp.status === 'completed') return;
    
    setExports(prev => prev.map(e => e.id === id ? { ...e, status: 'completed' } : e));
    
    // Update stock
    exp.items.forEach(item => {
      setProducts(pList => pList.map(p =>
        p.id === item.productId ? { ...p, stock: Math.max(0, p.stock - item.quantity) } : p
      ));
    });
  }, [exports]);

  // ---- Partners (Suppliers) ----
  const addSupplier = useCallback((data) => {
    const newId = `ncc-${Date.now()}`;
    setSuppliersList(prev => [{ ...data, id: newId }, ...prev]);
  }, []);
  const updateSupplier = useCallback((id, data) => {
    setSuppliersList(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  }, []);
  const deleteSupplier = useCallback((id) => {
    setSuppliersList(prev => prev.filter(s => s.id !== id));
  }, []);

  // ---- Partners (Customers) ----
  const addCustomer = useCallback((data) => {
    const newId = `kh-${Date.now()}`;
    setCustomersList(prev => [{ ...data, id: newId }, ...prev]);
  }, []);
  const updateCustomer = useCallback((id, data) => {
    setCustomersList(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  }, []);
  const deleteCustomer = useCallback((id) => {
    setCustomersList(prev => prev.filter(c => c.id !== id));
  }, []);

  // ---- Stats ----
  const getStats = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const todayImports = imports.filter(i => i.date === today).length;
    const todayExports = exports.filter(e => e.date === today).length;
    const lowStockProducts = products.filter(p => p.stock <= p.minStock && p.stock > 0);
    const outOfStockProducts = products.filter(p => p.stock === 0);

    return { totalProducts, totalStock, todayImports, todayExports, lowStockProducts, outOfStockProducts };
  }, [products, imports, exports]);

  // ---- Users ----
  const addUser = useCallback((data) => {
    const newUser = { ...data, id: `u-${nextUserId++}` };
    setUsers(prev => [...prev, newUser]);
  }, []);

  const updateUser = useCallback((id, data) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
  }, []);

  const deleteUser = useCallback((id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  const value = {
    products, addProduct, updateProduct, deleteProduct, getProduct,
    imports, addImport, approveImport,
    exports, addExport, approveExport,
    categories,
    suppliers: suppliersList, addSupplier, updateSupplier, deleteSupplier,
    customers: customersList, addCustomer, updateCustomer, deleteCustomer,
    users, addUser, updateUser, deleteUser,
    getStats
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
