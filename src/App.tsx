import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/CustomerPage/Homepage";
import CustomerLayout from "./shared/layouts/CustomerLayout";
import AdminLayout from "./shared/layouts/AdminLayout";
import AdminPage from "./pages/AdminPage/adminPage"
import ProductAdminPage from "./pages/AdminPage/Product/ProductList"
import BookDetail from "./pages/CustomerPage/BookDetail"
import UserList from "./pages/AdminPage/User/UserList";
import CategoryList from "./pages/AdminPage/Category/CategoryList";
import ManagementPage from "./pages/AdminPage/Bill/BillList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<BookDetail />} />
        </Route>
        <Route path='/' element={<AdminLayout />}>
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="admin/product" element={<ProductAdminPage />} />
          <Route path="admin/user" element={<UserList />} />
          <Route path="admin/categories" element={<CategoryList />} />
          <Route path="admin/bills" element={<ManagementPage />} />
        </Route>
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </Router>
  );
};

export default App;