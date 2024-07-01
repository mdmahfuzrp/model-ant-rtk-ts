import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditDetails = lazy(() => import("./pages/EditDetails"));
const ViewDetails = lazy(() => import("./pages/ViewDetails"));
const Products = lazy(() => import("./pages/Products"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/product/:id" element={<ViewDetails />} />
          <Route path="/admin/product/:id/edit" element={<EditDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
