import { Avatar, Button, Modal, Rating, TextField } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import parser from "html-react-parser";

import {
  getProductDetails,
  submitReview,
} from "../../redux/actions/productActions";
import "./product.scss";
import { addToCart } from "../../redux/actions/cartActions";
import Loader from "../layout/Loader";
import { AlertContext } from "../layout/alertProvider";
import { clearErrors } from "../../redux/actions/orderAction";
import { REVIEW_SUBMIT_RESET } from "../../redux/constants/productConstants";
import MetaData from "../layout/header/MetaData";
import axios from "../../redux/axios";
import ProductCard from "../home/product";

const Product = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success, error } = useSelector((state) => state.review);
  let { product, simmilar, loading, recommended, topRatedProducts, sponsored } =
    useSelector((state) => state.product);
  const { home } = useSelector((state) => state.homeReducer);
  const [value, setValue] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigator = useNavigate();
  const { sendAlert } = useContext(AlertContext);

  const cartHandler = () => {
    if (product.stock < 0) {
      sendAlert("This product is out of stock", "error");
      return;
    }
    dispatch(addToCart(id, value));
    navigator("/cart");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (rating === 0) {
      return;
    }

    dispatch(submitReview(id, { rating, comment }));
    setOpen(!open);
  };

  const increament = () => {
    if (value === product.stock) return;

    setValue(value + 1);
  };

  const decreament = () => {
    if (value === 1) return;

    setValue(value - 1);
  };

  useEffect(() => {
    console.log("first");
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    try {
      axios.post("/view/view/new", { product: id }, { withCredentials: true });
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    console.log("first");
    if (error) {
      sendAlert(error, "error");
      dispatch(clearErrors());
    }
    if (success) {
      sendAlert("Review Submited", "success");
      dispatch({ type: REVIEW_SUBMIT_RESET });
      dispatch(getProductDetails(id));
    }
  }, [dispatch, success, error]);

  useEffect(() => {
    console.log("first");
    if (open && !user) {
      sessionStorage.setItem("link", location.pathname);
      navigator("/login");
    }
  }, [open, user, navigator]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <main>
            <MetaData title={product.name} />
            <section className="product">
              <div className="image">
                <Carousel
                  className="carousel"
                  NextIcon={<ArrowForward />}
                  PrevIcon={<ArrowBack />}
                >
                  {product.images &&
                    product.images.map((image) => (
                      <div className="carousel-div" key={image._id}>
                        <img
                          className="red"
                          src={image.url}
                          alt={image.public_id}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
              <section>
                <div className="product-info">
                  <h1>{product.name}</h1>
                  <div
                    style={{ color: "tomato" }}
                    className="price"
                  >{`₹${product.price}`}</div>
                  <div className="ratings">
                    <Rating
                      value={product.ratings}
                      precision={0.5}
                      name="read-only"
                      readOnly
                    />
                    <span>{`(${product.numOfReviews} reviews)`} </span>
                  </div>
                  <hr />

                  {/* <div className="select">
                    <div className="selected">
                      <button onClick={decreament}>-</button>
                      <input value={value} type="submit" />
                      <button onClick={increament}>+</button>
                    </div>
                    <button onClick={cartHandler} className="cart">
                      Add to cart
                    </button>
                  </div> */}
                  {product.stock < 0 && (
                    <>
                      <hr />
                      <div className="status">
                        <h3>Status : </h3>
                        <div
                          className={`stock ${
                            product.stock < 0 ? "" : "avail"
                          }`}
                        >
                          {product.stock < 0 ? "OutOfStock" : "InStock"}
                        </div>
                      </div>
                      <hr />
                    </>
                  )}
                  <div className="descriptions">
                    <h4>Description :-</h4>
                    <div>{parser(product.description)}</div>
                  </div>
                  <div className="submit-review">
                    <button onClick={() => setOpen(true)}>Submit Review</button>
                    <button
                      style={{
                        background: "transparent",
                        color: "tomato",
                        border: "1px solid tomato",
                      }}
                      onClick={cartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <Modal
                    className="review-modal"
                    open={open}
                    onClose={() => setOpen(!open)}
                  >
                    <form onSubmit={(e) => submitHandler(e)}>
                      <h4>Write Review</h4>
                      <Rating
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      ></Rating>
                      <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        className="text-field"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="buttons">
                        <Button onClick={() => setOpen(!open)} type="button">
                          Cancel
                        </Button>
                        <Button variant="outlined" type="submit">
                          Submit
                        </Button>
                      </div>
                    </form>
                  </Modal>
                </div>
              </section>
            </section>
            <section className="reviews">
              {sponsored && sponsored.length > 0 && (
                <>
                  <h3 className="featured-products">Sponsered Products</h3>
                  <section id="products" className="products-flex">
                    {sponsored.map((item) => (
                      <ProductCard key={item._id} product={item} />
                    ))}
                    {home &&
                      home.products &&
                      home.products.length > 0 &&
                      home.products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                  </section>
                </>
              )}
              {recommended && recommended.length > 0 && (
                <>
                  <h3 className="featured-products">Recommended Products</h3>
                  <section id="products" className="products-flex">
                    {recommended.map((item) => (
                      <ProductCard key={item._id} product={item} />
                    ))}
                  </section>
                </>
              )}
              <div className="reviews">
                <div>Reviews</div>
              </div>
              {product.reviews.length === 0 ? (
                <div className="no-reviews">No Reviews yet</div>
              ) : (
                <div className="all-reviews">
                  {product.reviews.map((item) => (
                    <div key={item._id} className="review-item">
                      <Avatar
                        style={{ width: "60px", height: "60px", padding: "0" }}
                        src={item.user.avatar.url}
                      />
                      <h3>{item.user.name}</h3>
                      <Rating
                        style={{ marginBottom: "10px", fontSize: "22px" }}
                        value={item.rating}
                        name="read-only"
                        readOnly
                      />
                      <p>{item.comment}</p>
                    </div>
                  ))}
                </div>
              )}
              <h3 className="featured-products">Simmilar Products</h3>
              <section id="products" className="products-flex">
                {simmilar &&
                  simmilar.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
                {home &&
                  home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
                {home &&
                  home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
              </section>
              <h3 className="featured-products">Top Rated Products</h3>
              <section id="products" className="products-flex">
                {topRatedProducts &&
                  topRatedProducts.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}

                {home &&
                  home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
                {home &&
                  home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
              </section>
            </section>
          </main>
        )
      )}
    </>
  );
};

export default Product;
