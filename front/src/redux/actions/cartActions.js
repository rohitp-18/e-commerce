import axios from "../axios";
import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      image: data.product.images[0].url,
      name: data.product.name,
      price: data.product.price,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const removeToCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_TO_CART, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const shippingInfoAction = (data) => async (dispatch, getState) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem(
    "shippingInfo",
    JSON.stringify(getState().cart.shippingInfo)
  );
};

export { addToCart, removeToCart, shippingInfoAction };
