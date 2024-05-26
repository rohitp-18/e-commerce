import React, { useContext, useEffect, useState } from "react";
import "./createProduct.scss";
import Slider from "./Slider";
import {
  Avatar,
  Box,
  Button,
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
import { useDispatch, useSelector } from "react-redux";
import { createproductAction } from "../../redux/actions/productActions";
import { AlertContext } from "../layout/alertProvider";
import {
  CLEAR_ERRORS,
  CREATE_PRODUCT_RESET,
} from "../../redux/constants/productConstants";

function CreateProduct() {
  const dispatch = useDispatch();
  const { isCreated, error, loading } = useSelector(
    (state) => state.updateProduct
  );
  const { sendAlert } = useContext(AlertContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState();

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
    dispatch(createproductAction({ name, price, description, stock, image }));
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
    if (isCreated) {
      sendAlert("Product created successfully", isCreated);
      dispatch({ type: CREATE_PRODUCT_RESET });
      navigator("/admin/products");
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [isCreated, dispatch, error]);

  return (
    <div className="admin">
      <Slider />
      <section className="create-products">
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
            <AttachMoney sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
            <Description sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
            <AccountTree sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
          <Button disabled={loading} type="submit">
            Create
          </Button>
        </form>
      </section>
    </div>
  );
}

export default CreateProduct;
