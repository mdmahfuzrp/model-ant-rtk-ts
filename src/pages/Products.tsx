import AdminSidebar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ProductList from "../components/ProductList";
const Products = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="">
        <ProductList />
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
