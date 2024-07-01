import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const Products = () => {
  return (
    <div className="admin-container">
      <main className="" style={{ paddingRight: "50px" }}>
        Hello
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
