import { SearchRounded } from "@mui/icons-material";
import { Autocomplete, Input, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "../home/product";
import "./search.scss";
import { getAllProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";

function Search() {
  const [search, setSearch] = useState(true);
  const [ratings, setRatings] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [word, setWord] = useState("");
  const [price, setPrice] = useState([100, 100000]);
  const [category, setCategory] = useState("");
  let Categories = [
    "laptop",
    "electronics",
    "mobile",
    "car",
    "grocery",
    "dress",
    "home",
  ];

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.allProducts);
  useEffect(() => {
    dispatch(getAllProducts(category, price, keyword, ratings));
  }, [category, dispatch, price, keyword, ratings]);

  const keyChange = (e) => {
    e.preventDefault();
    if (e.key === "Enter") setSearch(false);
  };
  return (
    <main className="main-search">
      {search ? (
        <section style={{ height: "100vh" }} className="search">
          <Input
            className="input"
            aria-label="Demo input"
            placeholder="Search Products here..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyUp={(e) => keyChange(e)}
            startAdornment={<SearchRounded />}
          />
        </section>
      ) : (
        <>
          <section className="search">
            <Input
              className="input"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onClick={() => setSearch(false)}
              aria-label="Demo input"
              placeholder="Search Products here..."
              startAdornment={<SearchRounded />}
            />
          </section>
          <section className="products">
            {products && (
              <>
                <section className="products-flex">
                  {products.map((product) => {
                    return <Product product={product} key={product._id} />;
                  })}
                </section>
                <section className="filters">
                  <div>
                    <h3>Price</h3>

                    <Slider
                      min={100}
                      max={100000}
                      className="price"
                      value={price}
                      size="small"
                      onChange={(e) => setPrice(e.target.value)}
                      valueLabelDisplay="auto"
                      disableSwap
                    />
                  </div>
                  <div className="categories">
                    <h3>Categories</h3>
                    {Categories.map((cat) => (
                      <div
                        key={cat}
                        className="category"
                        onClick={() => setCategory(cat)}
                        style={{
                          fontWeight: category === cat ? 600 : 400,
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                  <div>
                    <fieldset>
                      <legend>
                        <h3>Ratings</h3>
                      </legend>
                      <Slider
                        value={ratings}
                        className="rating"
                        max={5}
                        min={0}
                        onChange={(e) => setRatings(e.target.value)}
                        size="small"
                        valueLabelDisplay="auto"
                      />
                    </fieldset>
                  </div>
                </section>
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Search;
