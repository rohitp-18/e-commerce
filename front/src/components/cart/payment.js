import React, { useContext, useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Box, TextField } from "@mui/material";
import { CalendarMonth, CreditCard, Key } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newOrderAction } from "../../redux/actions/orderAction";
import "./payment.scss";
import { NEW_ORDER_RESET } from "../../redux/constants/orderConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import { AlertContext } from "../layout/alertProvider";

function Payment() {
  const { sendAlert } = useContext(AlertContext);
  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCvv] = useState();
  const [price, setPrice] = useState();
  const navigator = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { success, error, loading } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      orderItems: [...cartItems],
      shippingInfo,
      itemPrice: price,
      taxPrice: price * 0.12,
      shippingPrice: 0,
      totalPrice: price * 0.12 + price,
    };

    dispatch(newOrderAction(data));
  };

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch(clearErrors());
    }

    if (success) {
      sendAlert("order has been created", "success");
      dispatch({ type: NEW_ORDER_RESET });
      navigator("/success");
    }

    setPrice(cartItems.reduce((acc, i) => i.quantity * i.price + acc, 0));
  }, [dispatch, cartItems, error, alert, success, navigator]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CheckoutSteps step={2} />
          <section className="payment-section">
            <form onSubmit={(e) => submitHandler(e)}>
              <h2>Card Info</h2>
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
                <CalendarMonth
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
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
              <button type="submit">Pay - {price + price * 0.12}</button>
            </form>
          </section>
        </>
      )}
    </>
  );
}

export default Payment;
