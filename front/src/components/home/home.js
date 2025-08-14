import ProductCard from "./product";
import { useEffect } from "react";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { Link, useNavigate } from "react-router-dom";
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
import { Button } from "@mui/material";

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
    dispatch(getHomePage());
  }, [dispatch]);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="header flex flex-col items-center justify-center min-h-[40vh] bg-gradient-to-br from-indigo-600 to-blue-400 text-white text-center rounded-b-3xl shadow-lg mb-8">
            <h2 className="text-2xl md:text-3xl font-light mb-2 drop-shadow">
              Welcome to Ecommerce
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-lg">
              Find Amazing Products Below
            </h1>

            <a href="#products">
              <button onClick={() => navigate("#products")}>Scroll</button>
            </a>
          </section>
          <section className="products-section max-w-7xl mx-auto px-4">
            {home && home.products && home.products.length > 0 && (
              <>
                {home.sponsored && home.sponsored.length > 0 && (
                  <>
                    <h3 className="featured-products">Sponsered Products</h3>
                    <section
                      id="products"
                      className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                    >
                      {home.sponsored.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                    </section>
                  </>
                )}
                {home.products && home.products.length > 0 && (
                  <>
                    <h3 className="featured-products">Products</h3>
                    <section
                      id="products"
                      className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                    >
                      {home.products &&
                        home.products.map((item) => (
                          <ProductCard key={item._id} product={item} />
                        ))}
                    </section>
                  </>
                )}

                {/* category list */}
                <section
                  id="products"
                  className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-center gap-2 items-center"
                >
                  {categoryList.map((cat) => (
                    <Link
                      to={`/category/${cat.name}`}
                      className="block no-underline text-black"
                      key={cat.name}
                    >
                      <div className="category-flex">
                        <div className="category-div">{cat.icon}</div>
                        <h4>{cat.name}</h4>
                      </div>
                    </Link>
                  ))}
                </section>

                {/* recommended products */}
                {home.recommended && home.recommended.length > 0 && (
                  <>
                    <h3 className="featured-products">Recommended Products</h3>
                    <section
                      id="products"
                      className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                    >
                      {home.recommended.map((item) => (
                        <ProductCard key={item._id} product={item} />
                      ))}
                    </section>
                  </>
                )}

                {/* watched products */}
                {user && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center"></div>
                      <h3 className="featured-products">Watched Products</h3>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/watched")}
                        className="hover:bg-[#ee6046]"
                        sx={{ bgcolor: "tomato", color: "white" }}
                      >
                        <Link
                          to="/watched"
                          className="inline-flex items-center no-underline gap-2 text-sm font-medium transition-colors duration-200 text-white"
                        >
                          <span>See All</span>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </Button>
                    </div>
                    <section
                      id="products"
                      className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                    >
                      {home.views &&
                        home.views.map((item) => (
                          <ProductCard key={item._id} product={item.product} />
                        ))}
                    </section>
                  </>
                )}

                {/* featured products */}
                <h3 className="featured-products">Featured Products</h3>
                <section
                  id="products"
                  className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                >
                  {home.featuredProducts &&
                    home.featuredProducts.map((item) => (
                      <ProductCard key={item._id} product={item} />
                    ))}
                </section>

                {/* new products */}
                <h3 className="featured-products">New Products</h3>
                <section
                  id="products"
                  className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                >
                  {home.newProducts &&
                    home.newProducts.map((item) => (
                      <ProductCard key={item._id} product={item} />
                    ))}
                </section>

                {/* favourite products */}
                {user && home.favourites && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center"></div>
                      <h3 className="featured-products">Favourite Products</h3>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/watched")}
                        className="hover:bg-[#ee6046]"
                        sx={{ bgcolor: "tomato", color: "white" }}
                      >
                        <Link
                          to="/favourites"
                          className="inline-flex items-center no-underline gap-2 text-sm font-medium transition-colors duration-200 text-white"
                        >
                          <span>See All</span>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </Button>
                    </div>
                    <section
                      id="products"
                      className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                    >
                      {home.favourites.map((item) => (
                        <ProductCard key={item._id} product={item.product} />
                      ))}
                    </section>
                  </>
                )}

                {/* top rated products */}
                <h3 className="featured-products">Top Rated Products</h3>
                <section
                  id="products"
                  className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
                >
                  {home.topRatedProducts &&
                    home.topRatedProducts.map((item) => (
                      <ProductCard key={item._id} product={item} />
                    ))}
                </section>
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
