import React, { useContext, useEffect, useState } from "react";
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
  CalendarMonth,
  CreditCard,
  Description,
  Key,
  Spellcheck,
  Storage,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../layout/alertProvider";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_ERRORS,
  CREATE_ADVERT_RESET,
} from "../../redux/constants/advertiseConstants";
import { createAdvertAction } from "../../redux/actions/advertiseAction";

function CreateAds() {
  const dispatch = useDispatch();
  const { isCreated, error, loading } = useSelector((state) => state.advert);
  const navigator = useNavigate();
  const { sendAlert } = useContext(AlertContext);

  const [name, setName] = useState("");
  const [expireDate, setExpireDate] = useState();
  const [description, setDescription] = useState("");
  const [initialDate, setInitialDate] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [payment, setPayment] = useState(false);

  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCvv] = useState();

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
    dispatch(
      createAdvertAction({
        name,
        expireDate,
        description,
        initialDate,
        image,
        category,
        paymentRecipt: "trail",
        paymentDetails: { type: "online", price: 234 },
      })
    );
  };

  const handlePayment = (e) => {
    e.preventDefault();
    console.log(new Date(initialDate) - new Date(expireDate));
    if (new Date(initialDate) < new Date()) {
      sendAlert("please enter valid date", "error");
      return;
    }
    if (new Date(initialDate) - new Date(expireDate) >= 0) {
      sendAlert("please enter valid date2", "error");
      return;
    }
    setPayment(true);
  };

  const imageChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isCreated) {
      sendAlert("Product created successfully", "success");
      dispatch({ type: CREATE_ADVERT_RESET });
      navigator("/admin/ads");
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
        {!payment ? (
          <form onSubmit={handlePayment}>
            <h3>Create Advertisement</h3>
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
                name="expireDate"
                sx={{ width: "30ch" }}
                value={initialDate}
                label="Price"
                variant="standard"
                type="date"
                onChange={(e) => setInitialDate(e.target.value)}
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
                value={expireDate}
                label="Stock"
                variant="standard"
                type="date"
                onChange={(e) => setExpireDate(e.target.value)}
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
              {image && <Avatar src={image} />}
            </Box>
            <Button disabled={loading} type="submit">
              Create
            </Button>
          </form>
        ) : (
          <form onSubmit={submitHandler}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <CreditCard sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                required
                name="card-number"
                sx={{ width: "25ch" }}
                value={cardNumber}
                label="Card Number"
                variant="standard"
                type="number"
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <CalendarMonth sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                required
                name="card-expiry"
                sx={{ width: "25ch" }}
                value={expiry}
                label="Card Expiry"
                variant="standard"
                type="number"
                onChange={(e) => setExpiry(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Key sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                required
                name="cvv"
                sx={{ width: "25ch" }}
                value={cvv}
                label="CVV"
                variant="standard"
                type="number"
                onChange={(e) => setCvv(e.target.value)}
              />
            </Box>
            <Button disabled={loading} type="submit">
              Create
            </Button>
          </form>
        )}
      </section>
    </div>
  );
}

export default CreateAds;
