import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/CustomerPage/Homepage";
import CustomerLayout from "./shared/layouts/CustomerLayout";
import AdminLayout from "./shared/layouts/AdminLayout";
import AdminPage from "./pages/AdminPage/adminPage"
import ProductAdminPage from "./pages/AdminPage/Product/ProductList"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path='/' element={<AdminLayout />}>
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="admin/product" element={<ProductAdminPage />} />
        </Route>
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </Router>
  );
};

export default App;