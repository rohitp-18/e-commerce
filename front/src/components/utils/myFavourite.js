import React from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import ProductCard from "../home/product";
import NotFound from "../../assets/not_found.svg";

function MyFavourite() {
  const { home } = useSelector((state) => state.homeReducer);
  const { favourites, error, loading } = useSelector((state) => state.view);
  const { user } = useSelector((state) => state.user);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <section className="max-w-6xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize text-gray-800">
            {error ? error : "Favourite Products"}
          </h2>
          {loading && <Loader />}
        </div>
        {!loading && (
          <>
            {favourites && favourites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favourites.map((item) => (
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
                  No products found in this favourites list.
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

        {user && (
          <>
            <h3 className="featured-products">Watched Products</h3>
            <section
              id="products"
              className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
            >
              {home &&
                home.views &&
                home.views.map((item) => (
                  <ProductCard key={item._id} product={item.product} />
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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7C5 5.89543 5.89543 5 7 5H19C20.1046 7 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 7Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </section>
    </main>
  );
}

export default MyFavourite;
