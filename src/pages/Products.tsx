import AdminSidebar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import ProductList from "../components/ProductList";
const Products = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="">
        <ProductList />
      </main>
      <Link to="/admin/dashboard" className="create-product-btn">
        <TbListDetails />
      </Link>
    </div>
  );
};

export default Products;
