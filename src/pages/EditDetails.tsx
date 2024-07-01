import AdminSidebar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import EditProduct from "../components/EditProduct";
const EditDetails = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <EditProduct />
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default EditDetails;
