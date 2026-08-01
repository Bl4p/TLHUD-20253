// ============================================
// MOCK DATA - Warehouse Management System
// ============================================

export const categories = [
  { id: 'cat-1', name: 'Điện tử', icon: '💻' },
  { id: 'cat-2', name: 'Văn phòng phẩm', icon: '📎' },
  { id: 'cat-3', name: 'Thực phẩm', icon: '🍜' },
  { id: 'cat-4', name: 'Gia dụng', icon: '🏠' },
  { id: 'cat-5', name: 'Quần áo', icon: '👕' },
];

export const suppliers = [
  { id: 'sup-1', name: 'Công ty TNHH ABC', phone: '0901234567', email: 'abc@company.vn' },
  { id: 'sup-2', name: 'Công ty CP XYZ', phone: '0912345678', email: 'xyz@company.vn' },
  { id: 'sup-3', name: 'Nhà phân phối Minh Anh', phone: '0923456789', email: 'minhanh@dist.vn' },
  { id: 'sup-4', name: 'Công ty Hoàng Long', phone: '0934567890', email: 'hoanglong@company.vn' },
  { id: 'sup-5', name: 'Đại lý Phương Nam', phone: '0945678901', email: 'phuongnam@agent.vn' },
];

export const customers = [
  { id: 'cus-1', name: 'Phòng Kinh doanh', type: 'department' },
  { id: 'cus-2', name: 'Phòng Kỹ thuật', type: 'department' },
  { id: 'cus-3', name: 'Khách hàng Nguyễn Văn A', type: 'customer' },
  { id: 'cus-4', name: 'Cửa hàng Chi nhánh 1', type: 'branch' },
  { id: 'cus-5', name: 'Khách hàng Trần Thị B', type: 'customer' },
];

export const units = ['Cái', 'Hộp', 'Thùng', 'Kg', 'Gói', 'Chai', 'Bộ', 'Cuộn', 'Tờ'];



export const initialProducts = [
  { id: 'p-1', sku: 'DT-001', name: 'Laptop MacBook Air M3 13 inch', categoryId: 'cat-1', unit: 'Cái', stock: 25, minStock: 5, importPrice: 15000000, sellPrice: 18500000 },
  { id: 'p-2', sku: 'DT-002', name: 'Chuột không dây Logitech M331', categoryId: 'cat-1', unit: 'Cái', stock: 150, minStock: 20, importPrice: 350000, sellPrice: 490000 },
  { id: 'p-3', sku: 'DT-003', name: 'Bàn phím cơ Corsair K70', categoryId: 'cat-1', unit: 'Cái', stock: 42, minStock: 10, importPrice: 2800000, sellPrice: 3500000 },
  { id: 'p-4', sku: 'DT-004', name: 'Tai nghe Sennheiser HD 280', categoryId: 'cat-1', unit: 'Cái', stock: 8, minStock: 10, importPrice: 6500000, sellPrice: 8200000 },
  { id: 'p-5', sku: 'DT-005', name: 'Apple Watch Series 5', categoryId: 'cat-1', unit: 'Cái', stock: 200, minStock: 30, importPrice: 120000, sellPrice: 180000 },
  { id: 'p-6', sku: 'VP-001', name: 'Tai nghe Sony WH-2000XM5', categoryId: 'cat-2', unit: 'Gói', stock: 300, minStock: 50, importPrice: 55000, sellPrice: 72000 },
  { id: 'p-7', sku: 'VP-002', name: 'Áo phông trắng - nữ', categoryId: 'cat-2', unit: 'Hộp', stock: 3, minStock: 10, importPrice: 40000, sellPrice: 58000 },
  { id: 'p-8', sku: 'VP-003', name: 'Giày thể thao unisex - trẻ em', categoryId: 'cat-2', unit: 'Hộp', stock: 85, minStock: 15, importPrice: 15000, sellPrice: 25000 },
  { id: 'p-9', sku: 'VP-004', name: 'Sổ tay bìa da A5', categoryId: 'cat-2', unit: 'Cuộn', stock: 120, minStock: 20, importPrice: 45000, sellPrice: 75000 },
  { id: 'p-10', sku: 'TP-001', name: 'Mì ăn liền Hảo Hảo (thùng 30)', categoryId: 'cat-3', unit: 'Thùng', stock: 45, minStock: 10, importPrice: 95000, sellPrice: 120000 },
  { id: 'p-11', sku: 'TP-002', name: 'Laptop MacBook Air M3 15 inch', categoryId: 'cat-3', unit: 'Thùng', stock: 60, minStock: 15, importPrice: 65000, sellPrice: 85000 },
  { id: 'p-12', sku: 'TP-003', name: 'Chuột không dây Logitech M332', categoryId: 'cat-3', unit: 'Hộp', stock: 0, minStock: 10, importPrice: 48000, sellPrice: 65000 },
  { id: 'p-13', sku: 'GD-001', name: 'Nồi cơm điện Sunhouse 1.8L', categoryId: 'cat-4', unit: 'Cái', stock: 18, minStock: 5, importPrice: 650000, sellPrice: 890000 },
  { id: 'p-14', sku: 'GD-002', name: 'Tai nghe Sennheiser HD 206', categoryId: 'cat-4', unit: 'Cái', stock: 35, minStock: 8, importPrice: 320000, sellPrice: 450000 },
  { id: 'p-15', sku: 'GD-003', name: 'Apple Watch Ultra', categoryId: 'cat-4', unit: 'Cái', stock: 4, minStock: 10, importPrice: 180000, sellPrice: 280000 },
  { id: 'p-16', sku: 'QA-001', name: 'Tai nghe Sony WH-1000XM5', categoryId: 'cat-5', unit: 'Cái', stock: 250, minStock: 30, importPrice: 75000, sellPrice: 150000 },
  { id: 'p-17', sku: 'QA-002', name: 'Áo phông trắng - nam', categoryId: 'cat-5', unit: 'Cái', stock: 80, minStock: 15, importPrice: 220000, sellPrice: 380000 },
  { id: 'p-18', sku: 'QA-003', name: 'Giày thể thao unisex - người lớn', categoryId: 'cat-5', unit: 'Bộ', stock: 2, minStock: 8, importPrice: 350000, sellPrice: 550000 },
  { id: 'p-19', sku: 'DT-006', name: 'Màn hình Dell 24" FHD', categoryId: 'cat-1', unit: 'Cái', stock: 12, minStock: 5, importPrice: 4200000, sellPrice: 5200000 },
  { id: 'p-20', sku: 'VP-005', name: 'Máy tính Casio FX-580VN X', categoryId: 'cat-2', unit: 'Cái', stock: 55, minStock: 10, importPrice: 520000, sellPrice: 680000 },
];

const today = new Date();
const formatDate = (d) => d.toISOString().split('T')[0];
const daysAgo = (n) => { const d = new Date(today); d.setDate(d.getDate() - n); return formatDate(d); };

export const initialImports = [
  { id: 'imp-1', code: 'PN-2026-001', supplierId: 'sup-1', date: daysAgo(0), items: [{ productId: 'p-1', quantity: 10 }, { productId: 'p-2', quantity: 50 }], note: 'Nhập hàng định kỳ', createdAt: daysAgo(0) },
  { id: 'imp-2', code: 'PN-2026-002', supplierId: 'sup-2', date: daysAgo(0), items: [{ productId: 'p-6', quantity: 100 }], note: 'Bổ sung văn phòng phẩm', createdAt: daysAgo(0) },
  { id: 'imp-3', code: 'PN-2026-003', supplierId: 'sup-3', date: daysAgo(1), items: [{ productId: 'p-10', quantity: 20 }, { productId: 'p-11', quantity: 30 }], note: '', createdAt: daysAgo(1) },
  { id: 'imp-4', code: 'PN-2026-004', supplierId: 'sup-1', date: daysAgo(2), items: [{ productId: 'p-3', quantity: 15 }], note: 'Nhập bàn phím mới', createdAt: daysAgo(2) },
  { id: 'imp-5', code: 'PN-2026-005', supplierId: 'sup-4', date: daysAgo(3), items: [{ productId: 'p-13', quantity: 10 }, { productId: 'p-14', quantity: 20 }], note: 'Nhập hàng gia dụng', createdAt: daysAgo(3) },
  { id: 'imp-6', code: 'PN-2026-006', supplierId: 'sup-5', date: daysAgo(5), items: [{ productId: 'p-16', quantity: 100 }, { productId: 'p-17', quantity: 50 }], note: '', createdAt: daysAgo(5) },
  { id: 'imp-7', code: 'PN-2026-007', supplierId: 'sup-2', date: daysAgo(7), items: [{ productId: 'p-8', quantity: 30 }], note: 'Bổ sung kẹp giấy', createdAt: daysAgo(7) },
  { id: 'imp-8', code: 'PN-2026-008', supplierId: 'sup-1', date: daysAgo(10), items: [{ productId: 'p-4', quantity: 5 }, { productId: 'p-5', quantity: 100 }], note: '', createdAt: daysAgo(10) },
  { id: 'imp-9', code: 'PN-2026-009', supplierId: 'sup-3', date: daysAgo(14), items: [{ productId: 'p-12', quantity: 20 }], note: 'Nhập cà phê', createdAt: daysAgo(14) },
  { id: 'imp-10', code: 'PN-2026-010', supplierId: 'sup-4', date: daysAgo(20), items: [{ productId: 'p-19', quantity: 8 }, { productId: 'p-20', quantity: 20 }], note: 'Nhập thiết bị IT', createdAt: daysAgo(20) },
].map(item => ({ ...item, status: 'completed' }));

export const initialExports = [
  { id: 'exp-1', code: 'PX-2026-001', customerId: 'cus-1', date: daysAgo(0), items: [{ productId: 'p-6', quantity: 20 }, { productId: 'p-7', quantity: 2 }], note: 'Cấp văn phòng phẩm tháng 8', createdAt: daysAgo(0) },
  { id: 'exp-2', code: 'PX-2026-002', customerId: 'cus-3', date: daysAgo(0), items: [{ productId: 'p-1', quantity: 2 }], note: 'Đơn hàng #1234', createdAt: daysAgo(0) },
  { id: 'exp-3', code: 'PX-2026-003', customerId: 'cus-2', date: daysAgo(1), items: [{ productId: 'p-2', quantity: 10 }, { productId: 'p-3', quantity: 5 }], note: 'Trang bị phòng kỹ thuật', createdAt: daysAgo(1) },
  { id: 'exp-4', code: 'PX-2026-004', customerId: 'cus-4', date: daysAgo(2), items: [{ productId: 'p-16', quantity: 30 }, { productId: 'p-17', quantity: 15 }], note: 'Chuyển hàng chi nhánh 1', createdAt: daysAgo(2) },
  { id: 'exp-5', code: 'PX-2026-005', customerId: 'cus-5', date: daysAgo(3), items: [{ productId: 'p-13', quantity: 2 }, { productId: 'p-14', quantity: 3 }], note: 'Đơn hàng online', createdAt: daysAgo(3) },
  { id: 'exp-6', code: 'PX-2026-006', customerId: 'cus-1', date: daysAgo(5), items: [{ productId: 'p-9', quantity: 10 }], note: '', createdAt: daysAgo(5) },
  { id: 'exp-7', code: 'PX-2026-007', customerId: 'cus-3', date: daysAgo(8), items: [{ productId: 'p-18', quantity: 3 }], note: 'Đơn hàng #1189', createdAt: daysAgo(8) },
  { id: 'exp-8', code: 'PX-2026-008', customerId: 'cus-2', date: daysAgo(12), items: [{ productId: 'p-19', quantity: 4 }], note: 'Trang bị màn hình', createdAt: daysAgo(12) },
  { id: 'exp-9', code: 'PX-2026-009', customerId: 'cus-4', date: daysAgo(15), items: [{ productId: 'p-10', quantity: 10 }, { productId: 'p-11', quantity: 15 }], note: '', createdAt: daysAgo(15) },
  { id: 'exp-10', code: 'PX-2026-010', customerId: 'cus-5', date: daysAgo(21), items: [{ productId: 'p-15', quantity: 5 }], note: 'Đơn hàng lẻ', createdAt: daysAgo(21) },
].map(item => ({ ...item, status: 'completed' }));



export const chartData = {
  months: ['Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8'],
  imports: [45, 62, 38, 55, 72, 58],
  exports: [32, 48, 42, 51, 63, 47],
  importValues: [125, 180, 95, 165, 210, 155],
  exportValues: [98, 145, 110, 155, 185, 130],
};

export const initialNotifications = [
  { id: 'noti-1', type: 'alert', title: 'Hàng sắp hết', message: 'Tai nghe Sony WH-1000XM5 chỉ còn 8 sản phẩm', read: false, time: '10 phút trước' },
  { id: 'noti-2', type: 'import', title: 'Phiếu nhập mới', message: 'PN-2026-001 đã được tạo bởi Admin', read: false, time: '25 phút trước' },
  { id: 'noti-3', type: 'export', title: 'Phiếu xuất mới', message: 'PX-2026-001 - Xuất cho Phòng Kinh doanh', read: false, time: '1 giờ trước' },
  { id: 'noti-4', type: 'alert', title: 'Hết hàng', message: 'Cà phê hòa tan G7 đã hết hàng', read: true, time: '3 giờ trước' },
  { id: 'noti-5', type: 'alert', title: 'Hàng sắp hết', message: 'Bút bi Thiên Long TL-027 chỉ còn 3 hộp', read: true, time: '6 giờ trước' },
  { id: 'noti-6', type: 'import', title: 'Phiếu nhập mới', message: 'PN-2026-003 - Nhập thực phẩm từ Minh Anh', read: true, time: 'Hôm qua' },
  { id: 'noti-7', type: 'export', title: 'Phiếu xuất mới', message: 'PX-2026-003 - Xuất cho Phòng Kỹ thuật', read: true, time: 'Hôm qua' },
  { id: 'noti-8', type: 'alert', title: 'Hàng sắp hết', message: 'Giày thể thao unisex chỉ còn 2 đôi', read: true, time: '2 ngày trước' },
];

export const demoUsers = [
  {
    id: 'u-1',
    name: 'Nguyễn Quản Trị',
    email: 'admin@warehouse.vn',
    password: 'admin',
    role: 'Admin',
    avatar: null,
  },
  {
    id: 'u-2',
    name: 'Trần Quản Lý',
    email: 'manager@warehouse.vn',
    password: '123',
    role: 'QL kho',
    avatar: null,
  },
  {
    id: 'u-3',
    name: 'Lê Nhân Viên',
    email: 'staff@warehouse.vn',
    password: '123',
    role: 'NV kho',
    avatar: null,
  },
  {
    id: 'u-4',
    name: 'Phạm Kế Toán',
    email: 'accountant@warehouse.vn',
    password: '123',
    role: 'Kế toán',
    avatar: null,
  },
];

export const userProfile = demoUsers[0];
