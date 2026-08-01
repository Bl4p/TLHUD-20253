# Warehouse Management System (WMS)

## 📋 Overview
Đây là một Hệ thống Quản lý Kho hàng (WMS) đơn giản, hiện đại và trực quan được xây dựng bằng **React + Vite**. Hệ thống giúp các doanh nghiệp vừa và nhỏ dễ dàng theo dõi số lượng tồn kho, quản lý hoạt động xuất/nhập kho, đối tác và phân quyền nhân sự chi tiết.

## 🚀 Tính năng chính (Features)

- **📊 Dashboard Trực quan**: Thống kê số lượng sản phẩm, tổng tồn kho, phiếu nhập/xuất trong ngày. Hiển thị cảnh báo hàng sắp hết và biểu đồ tương tác thời gian thực.
- **📦 Quản lý Sản phẩm**: Thêm, sửa, xóa sản phẩm. Theo dõi tồn kho, định mức tối thiểu, giá nhập, giá bán và xem chi tiết lịch sử xuất/nhập của từng mặt hàng.
- **🚚 Quản lý Nhập / Xuất Kho**: 
  - Tạo phiếu nhập/xuất hàng với thông tin nhà cung cấp/khách hàng.
  - Quy trình duyệt phiếu chặt chẽ (Chỉ Admin hoặc Quản lý kho mới được quyền Duyệt). Tồn kho chỉ thay đổi khi phiếu đã được duyệt thành công.
- **👥 Quản lý Nhân sự (RBAC)**: Phân quyền truy cập nghiêm ngặt theo 4 vai trò:
  - `Admin`: Toàn quyền.
  - `Quản lý kho`: Gần như toàn quyền nhưng không thể quản lý tài khoản nhân sự.
  - `Nhân viên kho`: Chỉ tạo phiếu, không được duyệt phiếu, không xem báo cáo.
  - `Kế toán`: Chỉ xem báo cáo, không thể can thiệp vào kho hàng.
- **🤝 Quản lý Đối tác**: Lưu trữ thông tin Nhà cung cấp (Suppliers) và Khách hàng (Customers).
- **📈 Báo cáo & Thống kê**: Xem các báo cáo xuất/nhập, doanh số và xuất dữ liệu ra file CSV (`export`).
- **📱 Responsive UI**: Giao diện thiết kế theo phong cách hiện đại (có dark mode support ngầm), hoạt động trơn tru trên Desktop, Tablet và Mobile.

## 🛠 Dependencies (Công nghệ sử dụng)

Dự án sử dụng các thư viện phổ biến và nhẹ nhàng để đảm bảo hiệu năng:
- **Core**: `React 18`, `React Router DOM v6` (Routing)
- **Build Tool**: `Vite` (Nhanh và tối ưu hoá tốt)
- **Charts**: `Chart.js` & `react-chartjs-2` (Vẽ biểu đồ động cho Dashboard và Reports)
- **Icons**: `lucide-react` (Bộ icon vector sắc nét, hiện đại)
- **Toast Notifications**: `react-hot-toast` (Hiển thị thông báo góc màn hình)

## 💻 Cài đặt & Chạy dự án (Getting Started)

1. **Yêu cầu hệ thống**: Đảm bảo máy tính của bạn đã cài đặt [Node.js](https://nodejs.org/).
2. **Cài đặt thư viện**: Mở terminal ở thư mục dự án và chạy lệnh:
   ```bash
   npm install
   ```
3. **Khởi chạy môi trường Dev**:
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt tại địa chỉ `http://localhost:5173`.

## 🔑 Tài khoản Demo (Dùng thử)

Hệ thống sử dụng Mock Data. Bạn có thể sử dụng các tài khoản sau để đăng nhập và trải nghiệm các vai trò khác nhau:

- **Admin**: `admin@warehouse.vn` / Mật khẩu: `admin`
- **Quản lý kho**: `manager@warehouse.vn` / Mật khẩu: `123`
- **Nhân viên kho**: `staff@warehouse.vn` / Mật khẩu: `123`
- **Kế toán**: `accountant@warehouse.vn` / Mật khẩu: `123`

---
*Phát triển bởi đội ngũ WMS Team.*
