import AdminSidebar from "../components/AdminSidebar";
import { Link, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import ProductDetail from "../components/ProductDetails";
const ViewDetails = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <ProductDetail />
      </main>
      <Link to={`/admin/product/${id}/edit`} className="create-product-btn">
        <FaRegEdit />
      </Link>
    </div>
  );
};

export default ViewDetails;
