import ProductCard from "./product";
import { useEffect } from "react";
import "./home.scss";
import { getAllProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import {
  CarRental,
  Girl,
  Home as Home2,
  Laptop,
  PhoneIphone,
  SdCard,
  ShoppingCart,
} from "@mui/icons-material";
import { getHomePage } from "../../redux/actions/homeActions";

const Home = () => {
  const dispatch = useDispatch();
  const { home, loading } = useSelector((state) => state.homeReducer);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const categoryList = [
    { name: "laptop", icon: <Laptop /> },
    { name: "electronics", icon: <SdCard /> },
    { name: "mobile", icon: <PhoneIphone /> },
    { name: "car accessories", icon: <CarRental /> },
    { name: "grocery", icon: <ShoppingCart /> },
    { name: "dress", icon: <Girl /> },
    { name: "home appliances", icon: <Home2 /> },
  ];

  useEffect(() => {
    console.log("first");
    dispatch(getHomePage());
  }, [dispatch]);

  // products,
  //     newProducts,
  //     featuredProducts,
  //     topRatedProducts,
  // sponsored,

  //     products,

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          {home && home.products && home.products.length > 0 && (
            <>
              <section className="header">
                <h2 style={{ fontWeight: 400, color: "#eee" }}>
                  Welcome to Ecommerce
                </h2>
                <h1 style={{ fontSize: "25px" }}>
                  FIND AMAZING PRODUCTS BELOW
                </h1>
                <a href="#products">
                  <button onClick={() => navigate("#products")}>Scroll</button>
                </a>
              </section>
              {home.sponsored && home.sponsored.length > 0 && (
                <>
                  <h3 className="featured-products">Sponsered Products</h3>
                  <section id="products" className="products-flex">
                    {home.sponsored.map((item) => (
                      <ProductCard key={item._id} product={item} />
                    ))}
                  </section>
                </>
              )}
              {home.products && home.products.length > 0 && (
                <>
                  <h3 className="featured-products">Products</h3>
                  <section id="products" className="products-flex">
                    {home.products &&
                      home.products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                  </section>
                </>
              )}
              {/* <h3 className="featured-products">Featured Products</h3> */}
              <section id="products" className="products-flex">
                {categoryList.map((cat) => (
                  <div key={cat.name}>
                    <div className="category-flex">
                      <div className="category-div">{cat.icon}</div>
                      <h4>{cat.name}</h4>
                    </div>
                  </div>
                ))}
              </section>

              {home.recommended && home.recommended.length > 0 && (
                <>
                  <h3 className="featured-products">Recommended Products</h3>
                  <section id="products" className="products-flex">
                    {home.recommended.map((item) => (
                      <ProductCard key={item._id} product={item} />
                    ))}
                  </section>
                </>
              )}

              {user && (
                <>
                  <h3 className="featured-products">Watched Products</h3>
                  <section id="products" className="products-flex">
                    {home.views &&
                      home.views.map((item) => (
                        <ProductCard key={item._id} product={item.product} />
                      ))}

                    {home.products &&
                      home.products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                    {home.products &&
                      home.products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                  </section>
                </>
              )}
              <h3 className="featured-products">Featured Products</h3>
              <section id="products" className="products-flex">
                {home.featuredProducts &&
                  home.featuredProducts.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
              </section>

              <h3 className="featured-products">New Products</h3>
              <section id="products" className="products-flex">
                {home.newProducts &&
                  home.newProducts.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}

                {home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
                {home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
              </section>
              {user && home.favorites && (
                <>
                  <h3 className="featured-products">Favorite Products</h3>
                  <section id="products" className="products-flex">
                    {home.favorites.map((item) => (
                      <ProductCard key={item._id} product={item.product} />
                    ))}

                    {home.products &&
                      home.products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                    {home.products &&
                      home.products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                  </section>
                </>
              )}
              <h3 className="featured-products">Top Rated Products</h3>
              <section id="products" className="products-flex">
                {home.topRatedProducts &&
                  home.topRatedProducts.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}

                {home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
                {home.products &&
                  home.products.map((item) => (
                    <ProductCard key={item._id} product={item} />
                  ))}
              </section>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
