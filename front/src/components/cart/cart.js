import React, { Fragment, useEffect } from "react";
import "./cart.scss";
import CartCard from "./CartCard";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../../redux/actions/cartActions";
import MetaData from "../layout/header/MetaData";

function Cart() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increament = (id, quantity, stock) => {
    if (stock <= quantity) return;
    dispatch(addToCart(id, quantity + 1));
  };

  const decreament = (id, quantity) => {
    if (quantity <= 1) return;
    dispatch(addToCart(id, quantity - 1));
  };

  const checkout = () => {
    navigator("/shipping");
  };

  const deleteCart = (id) => {
    dispatch(removeToCart(id));
  };

  useEffect(() => console.log(cartItems));

  return (
    <main className="cart-main">
      <MetaData title="Cart" />
      {cartItems && cartItems.length <= 0 ? (
        <section className="cart-empty">
          <ShoppingCartOutlined />
          <h2>Add any product to buy</h2>
          <button onClick={() => navigator("/")}>Products</button>
        </section>
      ) : (
        <section className="cart-section">
          <div className="cart-header">
            <h3>Product</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
          </div>
          {cartItems.map((item, i) => (
            <Fragment key={item.product}>
              <section className="cart-card">
                <CartCard
                  item={item}
                  deleteCart={() => deleteCart(item.product)}
                />
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

                <div className="cart-price">
                  <span>₹{item.price * item.quantity}</span>
                </div>
              </section>
              {i < cartItems.length - 1 && <hr />}
            </Fragment>
          ))}
          <div className="cart-total">
            <div>Total Price</div>
            <div>
              {cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}
            </div>
          </div>
          <div className="cart-button">
            <button type="button" onClick={checkout}>
              Check Out
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default Cart;
