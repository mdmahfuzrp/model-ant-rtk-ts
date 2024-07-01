import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import EditDetails from "./pages/EditDetails";
import ViewDetails from "./pages/ViewDetails";
const Products = lazy(() => import("./pages/Products"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/product/:id/edit" element={<EditDetails />} />
          <Route path="/admin/product/:id" element={<ViewDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
