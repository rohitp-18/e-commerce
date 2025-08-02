import React, { useContext, useEffect, useState } from "react";
import "./createProduct.scss";
import Slider from "./Slider";
import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  AccountTree,
  AttachMoney,
  Close,
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
import { useNavigate } from "react-router-dom";
import TextEditor from "./textEditor";

function CreateProduct() {
  const dispatch = useDispatch();
  const { isCreated, error, loading } = useSelector(
    (state) => state.updateProduct
  );
  const navigator = useNavigate();
  const { sendAlert } = useContext(AlertContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState();
  const [textEditor, setTextEditor] = useState(false);
  const [images, setImages] = useState([]);
  const categoryList = [
    "laptop",
    "electronics",
    "mobile",
    "car accessories",
    "grocery",
    "dress",
    "home appliances",
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("stock", stock);
    form.append("category", category);
    images.length > 0 && images.forEach((img) => form.append("images", img));

    dispatch(createproductAction(form));
  };

  const imageChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const files = Array.from(e.target.files);

    setImages([...images, ...files]);
    setImage(() => [...image]);

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
      sendAlert("Product created successfully", "success");
      dispatch({ type: CREATE_PRODUCT_RESET });
      navigator("/admin/products");
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line
  }, [isCreated, dispatch, error]);

  return (
    <div className="admin">
      <Slider />
      {!textEditor ? (
        <section className="create-products">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTextEditor(true);
            }}
          >
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
            {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
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
            </Box> */}
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
              onChange={(e) => {
                imageChange(e);
                e.target.value = null;
              }}
              accept="image/*"
              multiple
            />

            <Box className="images" sx={{ width: "32ch" }}>
              {image.map((img) => (
                <Badge
                  key={img}
                  sx={{ top: "8px" }}
                  className="badge"
                  badgeContent={
                    <IconButton
                      onClick={() => {
                        setImage(image.filter((ig) => img !== ig));
                        setImages(images.filter((ig) => img !== ig));
                      }}
                      sx={{ width: "14px", height: "14px" }}
                    >
                      <Close sx={{ color: "white", cursor: "pointer" }} />
                    </IconButton>
                  }
                  color="error"
                >
                  <Avatar src={img} key={img} />
                </Badge>
              ))}
            </Box>
            <Button disabled={loading} type="submit">
              Next
            </Button>
          </form>
        </section>
      ) : (
        <TextEditor
          description={description}
          setDescription={setDescription}
          loading={loading}
          heading={"Create"}
          submitHandler={submitHandler}
          setTextEditor={setTextEditor}
        />
      )}
    </div>
  );
}

export default CreateProduct;
