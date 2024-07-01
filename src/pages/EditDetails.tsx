import AdminSidebar from "../components/AdminSidebar";
import { Link, useParams } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import EditProduct from "../components/EditProduct";
const EditDetails = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <EditProduct />
      </main>
      <Link to={`/admin/product/${id}`} className="create-product-btn">
        <FiEye />
      </Link>
    </div>
  );
};

export default EditDetails;
