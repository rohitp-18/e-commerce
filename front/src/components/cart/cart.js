import React, { Fragment, useEffect } from "react";
import "./cart.scss";
import CartCard from "./CartCard";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartsAction,
  removeToCart,
  updateToCart,
} from "../../redux/actions/cartActions";
import MetaData from "../layout/header/MetaData";
import Loader from "../layout/Loader";

function Cart() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);

  const increament = (cartItem) => {
    if (cartItem.productId.stock <= cartItem.quantity) return;
    dispatch(
      updateToCart({ id: cartItem._id, quantity: cartItem.quantity + 1 }),
    );
  };

  const decreament = (cartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(
      updateToCart({ id: cartItem._id, quantity: cartItem.quantity - 1 }),
    );
  };

  const checkout = () => {
    navigator("/shipping");
  };

  const deleteCart = (id) => {
    dispatch(removeToCart(id));
  };

  useEffect(() => {
    dispatch(getCartsAction());
  }, [dispatch]);

  if (!cartItems || loading) {
    return <Loader />;
  }

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
            <Fragment key={item._id}>
              <section className="cart-card">
                <CartCard
                  item={item.productId}
                  deleteCart={() => deleteCart(item.product)}
                />
                <div className="cart-quantity">
                  <div className="selected">
                    <button onClick={() => decreament(item)}>-</button>
                    <input value={item.quantity} type="submit" readOnly />
                    <button onClick={() => increament(item)}>+</button>
                  </div>
                </div>

                <div className="cart-price">
                  <span>₹{item.productId?.price * item.quantity}</span>
                </div>
              </section>
              {i < cartItems.length - 1 && <hr />}
            </Fragment>
          ))}
          <div className="cart-total">
            <div>Total Price</div>
            <div>
              {cartItems.reduce(
                (acc, item) => acc + item.quantity * item.productId.price,
                0,
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
