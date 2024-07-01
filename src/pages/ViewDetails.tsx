import AdminSidebar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ProductDetail from "../components/ProductDetails";
const ViewDetails = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <ProductDetail />
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default ViewDetails;
