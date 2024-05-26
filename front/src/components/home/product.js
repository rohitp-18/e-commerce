import { Rating } from "@mui/material";
import "./home.scss";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    isHalf: true,
    edit: false,
    size: 17,
    activeColor: "#f7b733",
  };

  return (
    <Link className="none" to={`/product/${product._id}`}>
      <div className="product-card">
        <img
          src={product.images[0].url}
          alt={product.name}
          style={{ width: "100%", overflow: "hidden", height: "65%" }}
        />
        <div className="product-info">
          <h2>{product.name}</h2>
          <div className="ratings">
            <Rating
              style={{ fontSize: "20px" }}
              value={product.ratings}
              name="read-only"
              readOnly
            />
            <span style={{ fontSize: "12px" }}>
              ({product.numOfReviews} reviews)
            </span>
          </div>
          <div style={{ color: "red" }}>₹{product.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
