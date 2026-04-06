import React, { Fragment, useEffect } from "react";
import "./cart.scss";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getCartsAction } from "../../redux/actions/cartActions";
import MetaData from "../layout/header/MetaData";
import Loader from "../layout/Loader";
import CartItem from "./cartItem";

function Cart() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);

  const checkout = () => {
    navigator("/shipping");
  };

  useEffect(() => {
    dispatch(getCartsAction());
  }, [dispatch]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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
              <CartItem item={item} />
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
