import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import ProductCard from "../home/product";
import NotFound from "../../assets/not_found.svg";
import { getAllViewProducts } from "../../redux/actions/favouriteAction";

function WatchList() {
  const dispatch = useDispatch();
  const { home } = useSelector((state) => state.homeReducer);
  const { views, error, loading } = useSelector((state) => state.view);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllViewProducts());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <section className="max-w-6xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize text-gray-800">
            {error ? error : "Watched Products"}
          </h2>
          {loading && <Loader />}
        </div>
        {!loading && (
          <>
            {views && views.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {views.map((item) => (
                  <ProductCard key={item._id} product={item.product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] h-[50vh] max-h-[500px] bg-white rounded shadow">
                <img
                  src={NotFound}
                  alt="No Products Found"
                  className="mb-6 w-28 h-28"
                />
                <p className="text-gray-500 text-lg">
                  No products found in this Watched List.
                </p>
              </div>
            )}
          </>
        )}
        {home && home.sponsored && home.sponsored.length > 0 && (
          <>
            <h3 className="featured-products">Sponsered Products</h3>
            <section
              id="products"
              className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
            >
              {home &&
                home.sponsored.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
            </section>
          </>
        )}
        {home && home.recommended && home.recommended.length > 0 && (
          <>
            <h3 className="featured-products">Recommended Products</h3>
            <section
              id="products"
              className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
            >
              {home &&
                home.recommended.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
            </section>
          </>
        )}

        <h3 className="featured-products">Featured Products</h3>
        <section
          id="products"
          className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
        >
          {home &&
            home.featuredProducts &&
            home.featuredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>

        <h3 className="featured-products">New Products</h3>
        <section
          id="products"
          className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
        >
          {home &&
            home.newProducts &&
            home.newProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>
        {user && home && home.favourites && home.favourites.length > 0 && (
          <>
            <h3 className="featured-products">Favourite Products</h3>
            <section
              id="products"
              className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
            >
              {home &&
                home.favourites.map((item) => (
                  <ProductCard key={item._id} product={item.product} />
                ))}
            </section>
          </>
        )}
        <h3 className="featured-products">Top Rated Products</h3>
        <section
          id="products"
          className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
        >
          {home &&
            home.topRatedProducts &&
            home.topRatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>
      </section>
    </main>
  );
}

export default WatchList;
