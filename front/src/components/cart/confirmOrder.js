import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./confirmOrder.scss";
// import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { Public } from "@mui/icons-material";

function ConfirmOrder() {
  const [total, setTotal] = useState(0);
  const navigator = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const toPayment = () => {
    navigator("/payment");
  };

  useEffect(() => {
    setTotal(cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0));
  }, [navigator, total, cartItems]);
  return (
    <>
      <CheckoutSteps step={1} />
      <section className="confirm-order">
        <div className="shipping-order">
          <div className="shipping-info">
            <h2>Shipping info</h2>
            <div>
              <p>
                Name: <span>{shippingInfo.name}</span>
              </p>
              <p>
                Phone: <span>{shippingInfo.phone}</span>
              </p>
              <p>
                Address: <span>{shippingInfo.address}</span>
              </p>
            </div>
          </div>
          <div className="cart-items">
            <h2>Your Cart Items</h2>
            {cartItems.map((item) => (
              <div className="cart-card" key={item.product}>
                <div className="cart-img">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                </div>
                <div className="cart-price">
                  {item.quantity} x ₹{item.price} =
                  <span>₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div>
            <span>Shipping Charges</span>
            <span>₹0</span>
          </div>
          <div>
            <span>GST</span>
            <span>₹{total * 0.12}</span>
          </div>
          <div className="total-info">
            <span>Total</span>
            <span>₹{total * 0.12 + total}</span>
          </div>
          <button onClick={toPayment}>Procced To Payment</button>
        </div>
      </section>
    </>
  );
}

export default ConfirmOrder;
