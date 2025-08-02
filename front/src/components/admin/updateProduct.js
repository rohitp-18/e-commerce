import React, { useContext, useEffect, useState } from "react";
import "./updateProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  updateProductAction,
} from "../../redux/actions/productActions";
import Slider from "./Slider";
import {
  Avatar,
  Badge,
  Box,
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
import { useNavigate, useParams } from "react-router-dom";
import {
  CLEAR_ERRORS,
  UPDATE_PRODUCT_RESET,
} from "../../redux/constants/productConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import TextEditor from "./textEditor";

function UpdateProduct() {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);
  const { isUpdated, error } = useSelector((state) => state.updateProduct);
  const { id } = useParams();
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext);
  const [textEditor, setTextEditor] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [tempImages, setTempImages] = useState([]);
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
    if (stock < 1) {
      sendAlert("Stock must be greater than 0", "error");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("stock", stock);
    form.append("category", category);
    images.length > 0 && images.forEach((img) => form.append("images", img));
    tempImages.length > 0 &&
      tempImages.forEach((img) => form.append("image", img));

    dispatch(updateProductAction(id, form));
  };

  const imageChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const files = Array.from(e.target.files);

    setImages([...images, ...files]);

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
      navigate("/admin/products");
    }
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line
  }, [isUpdated, error, dispatch, navigate]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setCategory(product.category);
      setTempImages(product.images);
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
          {!textEditor ? (
            <section className="create-products">
              {product && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTextEditor(true);
                  }}
                >
                  <h3>Create Product</h3>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Spellcheck
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      required
                      name="Name"
                      sx={{ width: "30ch" }}
                      value={product.name}
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
                      value={product.price}
                      label="Price"
                      variant="standard"
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Storage sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    <TextField
                      required
                      name="Stock"
                      sx={{ width: "30ch" }}
                      value={product.stock}
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
                        value={product.category}
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
                    {tempImages.map((img) => (
                      <Badge
                        key={img}
                        sx={{ top: "8px" }}
                        className="badge"
                        badgeContent={
                          <IconButton
                            onClick={() => {
                              setTempImages(
                                tempImages.filter((ig) => img !== ig)
                              );
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
                  <button type="submit">Next</button>
                </form>
              )}
            </section>
          ) : (
            <TextEditor
              description={description}
              setDescription={setDescription}
              heading={"Update"}
              loading={loading}
              setTextEditor={setTextEditor}
              submitHandler={submitHandler}
            />
          )}
        </>
      )}
    </div>
  );
}

export default UpdateProduct;
