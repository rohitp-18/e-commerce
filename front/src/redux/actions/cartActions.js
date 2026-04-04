import { isAxiosError } from "axios";
import axios from "../axios";
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  ALL_TEMP_CART,
  CLEAR_TEMP_CART,
  ID_TEMP_CART,
  SAVE_SHIPPING_INFO,
  REMOVE_TO_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
} from "../constants/cartConstants";
import { REMOVE_FAVOURITE_FAIL } from "../constants/favouriteConstant";

const addToCart = (product, quantity) => async (dispatch, getState) => {
  try {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems),
    );
    await axios.post("/cart/add", { productId: product._id, quantity });
    dispatch({
      type: ADD_TO_CART_SUCCESS,
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
  } catch (error) {
    if (isAxiosError(error)) {
      dispatch({ type: ADD_TO_CART_FAIL, error: error.response.data.message });
      return;
    }
    dispatch({ type: ADD_TO_CART_FAIL, error: error.message });
  }
};

const removeToCart = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/cart/product/${id}`);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems),
    );
    dispatch({ type: REMOVE_TO_CART_SUCCESS, payload: id });
  } catch (error) {
    if (isAxiosError(error)) {
      dispatch({
        type: REMOVE_FAVOURITE_FAIL,
        error: error.response.data.message,
      });
      return;
    }
    dispatch({ type: REMOVE_FAVOURITE_FAIL, error: error.message });
  }
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

const getCartsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const { data } = await axios.get("/cart/");

    dispatch({ type: GET_CART_SUCCESS, payload: data.cart });
  } catch (error) {
    if (isAxiosError(error)) {
      dispatch({ type: GET_CART_FAIL, error: error.response.data.message });
      return;
    }
    dispatch({ type: ADD_TO_CART_FAIL, error: error.message });
  }
};

export {
  addToCart,
  removeToCart,
  shippingInfoAction,
  tempCartAction,
  getCartsAction,
};
