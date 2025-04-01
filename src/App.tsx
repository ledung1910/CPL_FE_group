import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./CustomerPage/Homepage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </Router>
  );
};

export default App;