import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { Box, Button, TextField } from "@mui/material";
import { CalendarMonth, CreditCard, Key } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../layout/alertProvider";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_ERRORS,
  CREATE_ADVERT_RESET,
} from "../../redux/constants/advertiseConstants";
import { createAdvertAction } from "../../redux/actions/advertiseAction";
import AdsForm from "./adsForm";

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
  const [tempImage, setTempImage] = useState();

  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCvv] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("expireDate", expireDate);
    form.append("description", description);
    form.append("initialDate", initialDate);
    form.append("image", tempImage);
    form.append("category", category);
    form.append("paymentRecipt", "trail");
    form.append("paymentDetails", { type: "online", price: 234 });

    dispatch(createAdvertAction(form));
  };

  const handlePayment = (e) => {
    e.preventDefault();
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
    setTempImage(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    console.log("first");
    if (isCreated) {
      sendAlert("Product created successfully", "success");
      dispatch({ type: CREATE_ADVERT_RESET });
      navigator("/admin/ads");
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreated, dispatch, error]);

  return (
    <div className="admin">
      <Slider />
      <section className="create-products">
        {!payment ? (
          <AdsForm
            setCategory={setCategory}
            setDescription={setDescription}
            setExpireDate={setExpireDate}
            setInitialDate={setInitialDate}
            setName={setName}
            name={name}
            expireDate={expireDate}
            initialDate={initialDate}
            description={description}
            loading={loading}
            handlePayment={handlePayment}
            image={image}
            imageChange={imageChange}
            heading="Create Advertisement"
          />
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
