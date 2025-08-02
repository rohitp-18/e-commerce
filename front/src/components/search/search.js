import { Close, FilterAltOutlined } from "@mui/icons-material";
import { Box, Button, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import Product from "../home/product";
import { getAllProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./filters";
import { useLocation } from "react-router-dom";
import NotFound from "../../assets/not_found.svg";

function Search() {
  const location = useLocation();

  const [ratings, setRatings] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState([100, 100000]);
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);

  // Clear all filters to default
  const clearFilters = () => {
    setRatings(0);
    setPrice([100, 100000]);
    setCategory();
  };

  useEffect(() => {
    dispatch(getAllProducts(category, price, keyword, ratings));
  }, [category, dispatch, price, keyword, ratings]);

  useEffect(() => {
    const link = location.search ? location.search.split("=")[1] : "";
    setKeyword(link);
  }, [location]);

  // Product Not Found Component
  const ProductNotFound = () => (
    <Box className="flex flex-col min-h-96 justify-center items-center opacity-80 hover:opacity-100 transition-opacity">
      {/* Open box illustration for "No Results" */}
      <img src={NotFound} alt="No Products Found" className="mb-6 w-28 h-28" />
      <span className="text-xl font-bold mb-2 text-gray-700">
        No Products Found
      </span>
      <span className="text-gray-500 mb-4 text-center max-w-xs">
        Looks like the box is empty.
        <br />
        Try changing your filters or search keywords.
      </span>
      {(price[0] !== 100 ||
        price[1] !== 100000 ||
        category !== undefined ||
        ratings !== 0) && (
        <Button
          onClick={clearFilters}
          variant="outlined"
          sx={{
            mt: 3,
            borderColor: "#6366F1",
            color: "#6366F1",
            "&:hover": { borderColor: "#4338CA", background: "#EEF2FF" },
          }}
        >
          Clear All Filters
        </Button>
      )}
    </Box>
  );

  return (
    <main className="bg-gray-200 min-h-screen w-full overflow-x-hidden">
      <section
        className={
          "block grid-cols-1 lg:grid-cols-[18rem_1fr] gap-8 w-full" +
          (price[0] !== 100 ||
          price[1] !== 100000 ||
          category !== undefined ||
          ratings !== 0 ||
          products?.length !== 0
            ? " lg:grid"
            : " lg:block")
        }
      >
        {/* Filters & Clear Button */}
        <aside className="hidden lg:flex flex-col gap-2">
          {(price[0] !== 100 ||
            price[1] !== 100000 ||
            category !== undefined ||
            ratings !== 0 ||
            products?.length !== 0) && (
            <Filters
              price={price}
              setPrice={setPrice}
              category={category}
              setCategory={setCategory}
              ratings={ratings}
              setRatings={setRatings}
              className="w-full p-4 mr-5 justify-center flex-col gap-4 bg-white rounded-r-md"
            />
          )}
        </aside>
        <section className="w-full flex flex-col">
          {/* Mobile Filter Button */}
          <div className="block lg:hidden mb-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<FilterAltOutlined />}
              onClick={() => setOpen(true)}
              className="rounded-full"
            >
              Filters
            </Button>
          </div>
          {/* Products */}
          {products && products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <ProductNotFound />
          )}
        </section>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{ className: "w-80" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold text-lg">Filters</span>
            <Close
              onClick={() => setOpen(false)}
              className="text-2xl cursor-pointer"
            />
          </div>
          <Filters
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            ratings={ratings}
            setRatings={setRatings}
            className="p-4 flex flex-col gap-4"
          />
          <div className="flex justify-between items-center px-4 py-3 border-t mt-auto">
            <Button onClick={clearFilters} variant="text">
              Reset
            </Button>
            <Button onClick={() => setOpen(false)} variant="contained">
              Done
            </Button>
          </div>
        </Drawer>
      </section>
    </main>
  );
}

export default Search;
