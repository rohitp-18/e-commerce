import { Close, FilterAltOutlined } from "@mui/icons-material";
import { Box, Button, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "../home/product";
import "./search.scss";
import { getAllProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./filters";
import { useLocation } from "react-router-dom";

function Search() {
  const param = useLocation();

  const [ratings, setRatings] = useState(0);
  const [keyword, setKeyword] = useState();
  const [word, setWord] = useState();
  const [price, setPrice] = useState([100, 100000]);
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts(category, price, keyword, ratings));
  }, [category, dispatch, price, keyword, ratings]);

  const keywordChange = (e) => {
    e.preventDefault();

    if (e.code === 13) {
      setKeyword(() => setKeyword(word));
    }
  };

  useEffect(() => {
    const link = param.search ? param.search.split("=")[1] : "";
    setKeyword(link);
    setWord(link);
  }, [param]);

  return (
    <main className="main-search">
      <section className="products">
        {products && (
          <>
            <section className="products-flex">
              {products.map((product) => {
                return <Product product={product} key={product._id} />;
              })}
            </section>
            {width > 650 ? (
              <Filters
                price={price}
                setPrice={setPrice}
                category={category}
                setCategory={setCategory}
                ratings={ratings}
                setRatings={setRatings}
                className="filters"
              />
            ) : (
              <>
                <div className="filter-div">
                  <FilterAltOutlined onClick={() => setOpen(true)} />
                </div>

                <Drawer
                  className="fliter-drawer"
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <div className="close">
                    <Close onClick={() => setOpen(false)} />
                  </div>
                  <Filters
                    price={price}
                    setPrice={setPrice}
                    category={category}
                    setCategory={setCategory}
                    ratings={ratings}
                    setRatings={setRatings}
                    className="mobile-filter"
                  />
                  <div className="button">
                    <div>
                      <Button onClick={() => setOpen(false)} variant="text">
                        Reset
                      </Button>
                      <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </Drawer>
              </>
            )}
          </>
        )}
        {products.length === 0 && (
          <Box className="box-not-product">Not Have Product</Box>
        )}
      </section>
    </main>
  );
}

export default Search;
