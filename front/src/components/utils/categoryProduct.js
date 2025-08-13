import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../redux/axios";
import Loader from "../layout/Loader";
import ProductCard from "../home/product";
import NotFound from "../../assets/not_found.svg";
import { useSelector } from "react-redux";

function CategoryProduct() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { category } = useParams();
  const { user } = useSelector((state) => state.user);

  async function getProductCategoryRequest() {
    const categoryList = [
      "laptop",
      "electronics",
      "mobile",
      "car accessories",
      "grocery",
      "dress",
      "home appliances",
    ];

    if (!categoryList.includes(category)) {
      setError("Category not found");
    }
    setLoading(true);

    try {
      const response = await axios.get(`/product/category/${category}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductCategoryRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <section className="max-w-6xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize text-gray-800">
            {error ? error : category ? `${category} Products` : "Products"}
          </h2>
          {loading && <Loader />}
        </div>
        {!loading && (
          <>
            {products && products.products && products.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.products.map((item) => (
                  <ProductCard key={item._id} product={item} />
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
                  No products found in this category.
                </p>
              </div>
            )}
          </>
        )}
        {products.sponsored && products.sponsored.length > 0 && (
          <>
            <h3 className="featured-products">Sponsered Products</h3>
            <section
              id="products"
              className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
            >
              {products.sponsored.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </section>
          </>
        )}
        {products.recommended && products.recommended.length > 0 && (
          <>
            <h3 className="featured-products">Recommended Products</h3>
            <section
              id="products"
              className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
            >
              {products.recommended.map((item) => (
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
              {products.views &&
                products.views.map((item) => (
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
          {products.featuredProducts &&
            products.featuredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>

        <h3 className="featured-products">New Products</h3>
        <section
          id="products"
          className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
        >
          {products.newProducts &&
            products.newProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>
        {user && products.favorites && products.favorites.length > 0 && (
          <>
            <h3 className="featured-products">Favorite Products</h3>
            <section
              id="products"
              className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
            >
              {products.favorites.map((item) => (
                <ProductCard key={item._id} product={item.product} />
              ))}

              {products.products &&
                products.products.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
            </section>
          </>
        )}
        <h3 className="featured-products">Top Rated Products</h3>
        <section
          id="products"
          className="products-flex w-full lg:gap-6 md:gap-4 sm:gap-3 justify-start gap-2 items-center"
        >
          {products.topRatedProducts &&
            products.topRatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </section>
      </section>
    </main>
  );
}

export default CategoryProduct;
