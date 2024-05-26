import ProductCard from "./product";
import { useEffect } from "react";
import "./home.scss";
import { getAllProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.allProducts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="header">
            <h2 style={{ fontWeight: 400, color: "#eee" }}>
              Welcome to Ecommerce
            </h2>
            <h1 style={{ fontSize: "25px" }}>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#products">
              <button onClick={() => navigate("#products")}>Scroll</button>
            </a>
          </section>
          <h3 className="featured-products">Featured Products</h3>
          <section id="products" className="products-flex">
            {products &&
              products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}

            {products &&
              products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
