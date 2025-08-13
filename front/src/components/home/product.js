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
import { useDispatch } from "react-redux";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [favourite, setFavourite] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <Card className="product-card">
        <CardMedia
          onClick={() => navigate(`/product/${product._id}`)}
          image={product.images[0].url}
          component={"img"}
          height={200}
          sx={{ objectFit: "contain" }}
          alt={product.name}
        />
        <IconButton className="icon-button">
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
