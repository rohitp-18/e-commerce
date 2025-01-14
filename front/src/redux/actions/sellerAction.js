import axios from "../axios";
import {
  SELLER_CREATE_PRODUCT_FAIL,
  SELLER_CREATE_PRODUCT_REQUEST,
  SELLER_CREATE_PRODUCT_SUCCESS,
  SELLER_DELETE_ORDER_FAIL,
  SELLER_DELETE_ORDER_REQUEST,
  SELLER_DELETE_ORDER_SUCCESS,
  SELLER_DELETE_PRODUCT_FAIL,
  SELLER_DELETE_PRODUCT_REQUEST,
  SELLER_DELETE_PRODUCT_SUCCESS,
  SELLER_ORDER_FAIL,
  SELLER_ORDER_REQUEST,
  SELLER_ORDER_SUCCESS,
  SELLER_PRODUCTS_FAIL,
  SELLER_PRODUCTS_REQUEST,
  SELLER_PRODUCTS_SUCCESS,
  SELLER_SINGLE_ORDER_FAIL,
  SELLER_SINGLE_ORDER_REQUEST,
  SELLER_SINGLE_ORDER_SUCCESS,
  SELLER_UPDATE_ORDER_FAIL,
  SELLER_UPDATE_ORDER_REQUEST,
  SELLER_UPDATE_ORDER_SUCCESS,
  SELLER_UPDATE_PRODUCT_FAIL,
  SELLER_UPDATE_PRODUCT_REQUEST,
  SELLER_UPDATE_PRODUCT_SUCCESS,
} from "../constants/sellerConstant";

const getSellerProductAction = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_PRODUCTS_REQUEST });

    const { data } = await axios.get("/product/seller", {
      withCredentials: true,
    });

    dispatch({ type: SELLER_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

const createSellerProductAction = (form) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_CREATE_PRODUCT_REQUEST });

    const { data } = await axios.post("/product/seller", form, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateSellerProductAction = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_UPDATE_PRODUCT_REQUEST });

    const { data } = await axios.put(`/product/seller/${id}`, form, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteSellerProductAction = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/product/seller/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const sellerOrderAction = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ORDER_REQUEST });

    const { data } = await axios.get("/order/seller", {
      withCredentials: true,
    });

    dispatch({ type: SELLER_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SELLER_ORDER_FAIL, payload: error.response.data.message });
  }
};

const getSingleSellerOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_SINGLE_ORDER_REQUEST });

    const { data } = await axios.get(`/order/seller/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_SINGLE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_SINGLE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateSellerOrderAction = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_UPDATE_ORDER_REQUEST });

    const { data } = await axios.put(
      `/order/seller/${id}`,
      { status },
      {
        withCredentials: true,
      }
    );

    dispatch({ type: SELLER_UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteSellerOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/order/seller/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  getSellerProductAction,
  createSellerProductAction,
  updateSellerProductAction,
  deleteSellerProductAction,

  //order
  sellerOrderAction,
  getSingleSellerOrder,
  updateSellerOrderAction,
  deleteSellerOrderAction,
};
