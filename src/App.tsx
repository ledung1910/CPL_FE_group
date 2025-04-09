import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/CustomerPage/Homepage";
import CustomerLayout from "./shared/layouts/CustomerLayout";
import AdminLayout from "./shared/layouts/AdminLayout";
import AdminPage from "./pages/AdminPage/adminPage";
import ProductAdminPage from "./pages/AdminPage/Product/ProductList";
import BookDetail from "./pages/CustomerPage/BookDetail";
import UserList from "./pages/AdminPage/User/UserList";
import CategoryList from "./pages/AdminPage/Category/CategoryList";
import ManagementPage from "./pages/AdminPage/Bill/BillList";
import Profile from "./pages/CustomerPage/Profile";
import UserProfile from "./pages/CustomerPage/UserProfile";
import Checkout from "./pages/CustomerPage/Checkout";
import Bookshow from "./shared/component/Bookshow";
import OrderLayout from "./shared/layouts/OrderLayout"
import ConfirmLayout from "./shared/layouts/ConfirmLayout"
// import Confirm from "./pages/CustomerPage/Confirm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          {/*route category test */}
          <Route path="/category/:category"
            element={
              <Bookshow
                filters={{
                  shipNow: false,
                  topDeal: false,
                  freeshipExtra: false,
                  rating: false,
                  sortBy: "",
                }}
                keyword=""
              />
            }
          />
          {/* */}
          <Route path="/detail" element={<BookDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user_profile" element={<UserProfile />} />

        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="admin/product" element={<ProductAdminPage />} />
          <Route path="admin/user" element={<UserList />} />
          <Route path="admin/categories" element={<CategoryList />} />
          <Route path="admin/bills" element={<ManagementPage />} />
        </Route>
        <Route path="/" element={<OrderLayout />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/" element={<ConfirmLayout />}>
          {/* <Route path="/confirm" element={<Confirm />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
