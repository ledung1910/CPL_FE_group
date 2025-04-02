import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./CustomerPage/Homepage";
import CustomerLayout from "./shared/layouts/CustomerLayout";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </Router>
  );
};

export default App;