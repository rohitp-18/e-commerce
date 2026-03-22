import axios from "../axios";
import {
  ADD_TO_CART,
  ALL_TEMP_CART,
  CLEAR_TEMP_CART,
  ID_TEMP_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

const addToCart = (product, quantity) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: product._id,
      image: product.images[0].url,
      name: product.name,
      price: product.price,
      stock: product.stock,
      user: product.user,
      quantity,
    },
  });

  try {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems),
    );
  } catch (error) {}
};

const removeToCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_TO_CART, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const shippingInfoAction = (data) => async (dispatch, getState) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem(
    "shippingInfo",
    JSON.stringify(getState().cart.shippingInfo),
  );
};

const tempCartAction = (id) => async (dispatch, getState) => {
  if (id === "all") {
    dispatch({ type: ALL_TEMP_CART, payload: getState().cart.cartItems });
  }
  if (id === "clear") dispatch({ type: CLEAR_TEMP_CART });
  else {
    dispatch({ type: ID_TEMP_CART, payload: id });
  }
};

export { addToCart, removeToCart, shippingInfoAction, tempCartAction };
