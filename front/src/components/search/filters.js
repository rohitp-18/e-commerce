import { Slider } from "@mui/material";
import React from "react";

function Filters({
  price,
  setPrice,
  category,
  setCategory,
  className,
  ratings,
  setRatings,
}) {
  let Categories = [
    "laptop",
    "electronics",
    "mobile",
    "car",
    "grocery",
    "dress",
    "home",
  ];
  return (
    <>
      <section className={className}>
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
  );
}

export default Filters;
