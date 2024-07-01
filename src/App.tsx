import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
const Products = lazy(() => import("./pages/Products"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/admin/product" element={<Products />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
