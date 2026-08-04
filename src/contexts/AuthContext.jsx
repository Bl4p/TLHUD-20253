import { createContext, useContext, useState, useCallback } from 'react';
import { userProfile, demoUsers } from '../data/mockData';

export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'QL kho',
  STAFF: 'NV kho',
  ACCOUNTANT: 'Kế toán'
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF, ROLES.ACCOUNTANT],
  VIEW_PRODUCTS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF, ROLES.ACCOUNTANT],
  MANAGE_PRODUCT: [ROLES.ADMIN, ROLES.MANAGER],
  DELETE_PRODUCT: [ROLES.ADMIN, ROLES.MANAGER],
  CREATE_IMPORT: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF],
  CREATE_EXPORT: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF],
  APPROVE_TICKET: [ROLES.ADMIN, ROLES.MANAGER],
  INVENTORY_CHECK: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF],
  VIEW_REPORTS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT],
  MANAGE_PARTNERS: [ROLES.ADMIN, ROLES.MANAGER],
  MANAGE_USERS: [ROLES.ADMIN],
  SETTINGS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF, ROLES.ACCOUNTANT]
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    setIsLoading(false);
    if (foundUser) {
      setUser({ ...foundUser });
      return { success: true };
    } else {
      return { success: false, error: 'Email hoặc mật khẩu không đúng' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((data) => {
    setUser(prev => ({ ...prev, ...data }));
  }, []);

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    const allowedRoles = PERMISSIONS[permission];
    if (!allowedRoles) return false;
    return allowedRoles.includes(user.role);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
