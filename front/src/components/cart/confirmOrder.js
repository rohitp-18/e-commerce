import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./confirmOrder.scss";
import { addToCart } from "../../redux/actions/cartActions";
// import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { Public } from "@mui/icons-material";

function ConfirmOrder({ setActiveStep, cartItems }) {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const toPayment = () => {
    setActiveStep(2);
  };

  const decreament = (id, quantity) => {
    if (quantity <= 1) return;
    dispatch(addToCart(id, quantity - 1));
  };

  const increament = (id, quantity, stock) => {
    if (stock <= quantity) return;
    dispatch(addToCart(id, quantity + 1));
  };

  return (
    <>
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
            {cartItems &&
              cartItems.map((item) => (
                <div className="cart-quan" key={item.product}>
                  <div className="cart-card">
                    <div className="cart-img">
                      <img src={item.image} alt={item.name} />
                      <p>{item.name}</p>
                    </div>
                    <div className="cart-price">
                      {item.quantity} x ₹{item.price} =
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <div className="cart-quantity">
                    <div className="selected">
                      <button
                        onClick={() => decreament(item.product, item.quantity)}
                      >
                        -
                      </button>
                      <input value={item.quantity} type="submit" readOnly />
                      <button
                        onClick={() =>
                          increament(item.product, item.quantity, item.stock)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div>
            <span>Subtotal</span>
            <span>
              ₹{cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0)}
            </span>
          </div>
          <div>
            <span>Shipping Charges</span>
            <span>₹0</span>
          </div>
          <div>
            <span>GST</span>
            <span>₹{0}</span>
          </div>
          <div className="total-info">
            <span>Total</span>
            <span>
              {" "}
              ₹{cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0)}
            </span>
          </div>
          <button onClick={toPayment}>Procced To Payment</button>
        </div>
      </section>
    </>
  );
}

export default ConfirmOrder;
