import { Button, Slider } from "@mui/material";
import React from "react";

const categories = [
  "laptop",
  "electronics",
  "mobile",
  "car",
  "grocery",
  "dress",
  "home",
];

function Filters({
  price,
  setPrice,
  category,
  setCategory,
  className = "",
  ratings,
  setRatings,
}) {
  // Handle slider value changes for MUI v5+
  const handlePriceChange = (_, newValue) => setPrice(newValue);
  const handleRatingsChange = (_, newValue) => setRatings(newValue);

  return (
    <div className={`bg-white border rounded p-4 ${className}`}>
      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <Slider
          min={100}
          max={100000}
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          disableSwap
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>₹{price[0]?.toLocaleString()}</span>
          <span>₹{price[1]?.toLocaleString()}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`w-full p-2 text-left border rounded ${
                category === cat
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Customer Ratings</h3>
        <Slider
          value={ratings}
          min={0}
          max={5}
          step={0.1}
          onChange={handleRatingsChange}
          valueLabelDisplay="auto"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{ratings[0]} & above</span>
          <span>{ratings[1]} stars</span>
        </div>
      </div>
      {/* Clear Filters Button */}
      <Button
        onClick={() => {
          setPrice([100, 100000]);
          setCategory("");
          setRatings([0, 5]);
        }}
        type="button"
        disabled={
          !category &&
          price[0] === 100 &&
          price[1] === 100000 &&
          ratings[0] === 0 &&
          ratings[1] === 5
        }
        aria-label="Clear Filters"
        sx={{ mt: 4, width: "100%", bgcolor: "red.400", color: "white" }}
        variant="contained"
      >
        Clear Filters
      </Button>
    </div>
  );
}

export default Filters;
