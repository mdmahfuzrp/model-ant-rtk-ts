import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/admin/product" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
