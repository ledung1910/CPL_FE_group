import { Routes, Route } from "react-router-dom";

// Layouts
import CustomerLayout from "./shared/layouts/CustomerLayout";
import AdminLayout from "./shared/layouts/AdminLayout";
import OrderLayout from "./shared/layouts/OrderLayout";
import ConfirmLayout from "./shared/layouts/ConfirmLayout";

// Admin Pages
import AdminLogin from "./pages/AdminPage/AdminLogin";
import AdminPage from "./pages/AdminPage/Dashboard";
import ProductAdminPage from "./pages/AdminPage/Product/ProductList";
import UserList from "./pages/AdminPage/User/UserList";
import CategoryList from "./pages/AdminPage/Category/CategoryList";
import ManagementPage from "./pages/AdminPage/Bill/BillList";

// Customer Pages
import HomePage from "./pages/CustomerPage/Product/Homepage";
import BookDetail from "./pages/CustomerPage/Product/BookDetail";
import OrderList from "./pages/CustomerPage/Profile/OrderList";
import OrderDetail from "./pages/CustomerPage/Profile/OrderDetail";
import UserProfile from "./pages/CustomerPage/Profile/UserProfile";
import OrderConfirmation from "./pages/CustomerPage/Order/ConfirmPage";
import Checkout from "./pages/CustomerPage/Order/Checkout";
import Cart from "./pages/CustomerPage/Order/Cart";

// Components
import ScrollToTop from "./shared/component/Provider/ScrollToTop";
import PrivateRoute from "./shared/component/Provider/PrivateRoute";

// CSS & Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Customer routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/orders"
            element={
              <PrivateRoute requiredRole="User">
                <OrderList />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <PrivateRoute requiredRole="User">
                <OrderDetail />
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

        {/* Checkout & Confirmation */}
        <Route
          element={
            <PrivateRoute requiredRole="User">
              <OrderLayout />
            </PrivateRoute>
          }
        >
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route
          element={
            <PrivateRoute requiredRole="User">
              <ConfirmLayout />
            </PrivateRoute>
          }
        >
          <Route path="/confirm/:orderId" element={<OrderConfirmation />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="Admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="product" element={<ProductAdminPage />} />
          <Route path="user" element={<UserList />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="bills" element={<ManagementPage />} />
        </Route>

        {/* Admin login */}
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default App;
