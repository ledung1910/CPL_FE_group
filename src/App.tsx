import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//Layout
import CustomerLayout from "./shared/layouts/CustomerLayout";
import AdminLayout from "./shared/layouts/AdminLayout";
import OrderLayout from "./shared/layouts/OrderLayout";
import ConfirmLayout from "./shared/layouts/ConfirmLayout";


//Admin Page
import AdminPage from "./pages/AdminPage/Dashboard";
import ProductAdminPage from "./pages/AdminPage/Product/ProductList";
import BookDetail from "./pages/CustomerPage/BookDetail";
import UserList from "./pages/AdminPage/User/UserList";
import CategoryList from "./pages/AdminPage/Category/CategoryList";
import ManagementPage from "./pages/AdminPage/Bill/BillList";


//Customer Page
import HomePage from "./pages/CustomerPage/Homepage";
import OrderManagement from "./pages/CustomerPage/OrderTracking";
import UserProfile from "./pages/CustomerPage/UserProfile";
import OrderConfirmation from "./pages/CustomerPage/ConfirmPage";
import Checkout from "./pages/CustomerPage/Checkout";


//Component
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./shared/component/ScrollToTop";
import AdminLogin from "./pages/AdminPage/AdminLogin";
import PrivateRoute from "./shared/component/PrivateRoute"
import Cart from "./pages/CustomerPage/Cart";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Các route của Customer */}
          <Route path="/" element={<CustomerLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<BookDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/order_tracking"
              element={
                <PrivateRoute requiredRole="User">
                  <OrderManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/user_profile"
              element={
                <PrivateRoute requiredRole="User">
                  <UserProfile />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Các route checkout và confirm bảo vệ bởi User */}
          <Route element={
            <PrivateRoute requiredRole="User">
              <OrderLayout />
            </PrivateRoute>}>
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route element={
            <PrivateRoute requiredRole="User">
              <ConfirmLayout />
            </PrivateRoute>}>
            <Route path="confirm" element={<OrderConfirmation />} />
          </Route>

          {/* Route cho Admin */}
          <Route path="/admin" element={
            <PrivateRoute requiredRole="Admin">
              <AdminLayout />
            </PrivateRoute>}>
            <Route index element={<AdminPage />} />
            <Route path="product" element={<ProductAdminPage />} />
            <Route path="user" element={<UserList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="bills" element={<ManagementPage />} />
          </Route>

          {/* Admin login */}
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};



export default App;



