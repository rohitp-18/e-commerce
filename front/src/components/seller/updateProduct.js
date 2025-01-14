import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import Slider from "./sellerNavbar";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  AccountTree,
  AttachMoney,
  Description,
  Spellcheck,
  Storage,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  CLEAR_ERRORS,
  UPDATE_PRODUCT_RESET,
} from "../../redux/constants/productConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import { updateSellerProductAction } from "../../redux/actions/sellerAction";

function SellerUpdateProduct() {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);
  const err = useSelector((state) => state.product);
  const { isUpdated, error } = useSelector((state) => state.sellerProduct);
  const { id } = useParams();
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState([]);

  const categoryList = [
    "laptop",
    "electronics",
    "mobile",
    "car",
    "grocery",
    "dress",
    "home",
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if (stock < 1) {
      alert("error");
      return;
    }
    dispatch(
      updateSellerProductAction(id, {
        name,
        price,
        category,
        description,
        stock,
      })
    );
  };

  const imageChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const files = Array.from(e.target.files);

    setImage(() => []);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setImage((image) => [...image, reader.result]);
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (isUpdated) {
      sendAlert("Product Updated successfully", "success");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/seller/products");
    }
    if (error || err.error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [isUpdated, error, dispatch, navigate]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setCategory(product.category);
      setImage(product.images.map((img) => img.url));
    }
  }, [product]);
  return (
    <div className="admin">
      <Slider />
      <MetaData title="Update Product - Admin" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="create-products">
            {product && (
              <form onSubmit={(e) => submitHandler(e)}>
                <h3>Create Product</h3>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Spellcheck sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    required
                    name="Name"
                    sx={{ width: "30ch" }}
                    value={name}
                    label="Name"
                    variant="standard"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AttachMoney
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    required
                    name="price"
                    sx={{ width: "30ch" }}
                    value={price}
                    label="Price"
                    variant="standard"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Description
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    required
                    name="Description"
                    sx={{ width: "30ch" }}
                    multiline
                    value={description}
                    label="Description"
                    variant="standard"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Storage sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    required
                    name="Stock"
                    sx={{ width: "30ch" }}
                    value={stock}
                    label="Stock"
                    variant="standard"
                    type="number"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountTree
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      label="Age"
                      value={category}
                      sx={{ width: "30ch" }}
                      required
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categoryList.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <input
                  type="file"
                  onChange={(e) => imageChange(e)}
                  accept="image/*"
                  multiple
                />

                <Box className="images" sx={{ width: "32ch" }}>
                  {image.map((img) => (
                    <Avatar src={img} key={img} />
                  ))}
                </Box>
                <button type="submit">Update</button>
              </form>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default SellerUpdateProduct;
