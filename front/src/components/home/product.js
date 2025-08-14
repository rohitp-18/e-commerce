import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
} from "@mui/material";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addToFavouriteAction,
  removeFromFavouriteAction,
} from "../../redux/actions/favouriteAction";

const ProductCard = ({ product }) => {
  const [favourite, setFavourite] = useState(false);

  const { favourites } = useSelector((state) => state.view);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFavouriteToggle() {
    if (favourite) {
      dispatch(removeFromFavouriteAction(product._id));
    } else {
      dispatch(addToFavouriteAction(product._id));
    }
    setFavourite(!favourite);
  }

  useEffect(() => {
    favourites &&
      setFavourite(favourites.some((item) => item.product._id === product._id));
  }, [product._id, favourites]);
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
        <IconButton onClick={handleFavouriteToggle} className="icon-button">
          {favourite ? (
            <Favorite sx={{ fill: "tomato" }} />
          ) : (
            <FavoriteBorder />
          )}
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
