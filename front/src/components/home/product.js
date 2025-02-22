import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
} from "@mui/material";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { FavoriteBorder } from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Link className="none" to={`/product/${product._id}`}> */}
      {/* <div className="product-card">
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
              contentEditable={false}
              readOnly
            />
            <span style={{ fontSize: "12px" }}>
              ({product.numOfReviews} reviews)
            </span>
          </div>
          <div style={{ color: "red" }}>₹{product.price}</div>
        </div>
      </div> */}
      <Card className="product-card">
        <CardMedia
          onClick={() => navigate(`/product/${product._id}`)}
          image={product.images[0].url}
          component={"img"}
          height={200}
          sx={{ objectFit: "contain" }}
          alt={product.name}
        />
        <IconButton
          className="icon-button"
          onClick={() => console.log("first")}
        >
          <FavoriteBorder />
        </IconButton>
        <CardContent
          onClick={() => navigate(`/product/${product._id}`)}
          sx={{ padding: "10px" }}
          className="product-info"
        >
          <h4>{product.name}</h4>
          <div className="ratings">
            <Rating
              style={{ fontSize: "20px" }}
              value={product.ratings}
              name="read-only"
              contentEditable={false}
              readOnly
            />
            <span style={{ fontSize: "12px" }}>
              ({product.numOfReviews} reviews)
            </span>
          </div>
          <div style={{ color: "red" }}>₹{product.price}</div>
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
