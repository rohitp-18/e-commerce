import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import useDebounce from "../../hooks/useDebounce";
import { removeToCart, updateToCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { UPDATE_CART_SUCCESS } from "../../redux/constants/cartConstants";

function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [btnPress, setBtnPress] = useState(false);

  const dispatch = useDispatch();

  const deleteCart = (id) => {
    dispatch(removeToCart(id));
  };

  const debounce = useDebounce(quantity, 500);

  const increament = (cartItem) => {
    if (cartItem.productId.stock <= cartItem.quantity) return;
    setBtnPress(true);
    setQuantity(item.quantity + 1);
    dispatch({
      type: UPDATE_CART_SUCCESS,
      payload: { _id: item._id, quantity: quantity + 1 },
    });
  };

  const decreament = (cartItem) => {
    if (cartItem.quantity <= 1) return;
    setBtnPress(true);
    setQuantity(quantity - 1);
    dispatch({
      type: UPDATE_CART_SUCCESS,
      payload: { _id: item._id, quantity: quantity - 1 },
    });
  };

  useEffect(() => {
    if (debounce && btnPress) {
      dispatch(updateToCart({ id: item._id, quantity: debounce }));
    }
    // runs only on updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  return (
    <section className="cart-card">
      <CartCard
        item={item.productId}
        deleteCart={() => deleteCart(item.product)}
      />
      <div className="cart-quantity">
        <div className="selected">
          <button onClick={() => decreament(item)}>-</button>
          <input value={quantity} type="submit" readOnly />
          <button onClick={() => increament(item)}>+</button>
        </div>
      </div>

      <div className="cart-price">
        <span>₹{item.productId?.price * quantity}</span>
      </div>
    </section>
  );
}

export default CartItem;
