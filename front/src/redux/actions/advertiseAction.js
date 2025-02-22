import axios from "../axios";
import {
  ADMIN_ADVERTS_FAIL,
  ADMIN_ADVERTS_REQUEST,
  ADMIN_ADVERTS_SUCCESS,
  ADVERT_DETAILS_FAIL,
  ADVERT_DETAILS_REQUEST,
  ADVERT_DETAILS_SUCCESS,
  CREATE_ADVERT_FAIL,
  CREATE_ADVERT_REQUEST,
  CREATE_ADVERT_SUCCESS,
  DELETE_ADVERT_FAIL,
  DELETE_ADVERT_REQUEST,
  DELETE_ADVERT_SUCCESS,
  SELLER_ADVERTS_FAIL,
  SELLER_ADVERTS_REQUEST,
  SELLER_ADVERTS_SUCCESS,
  SELLER_CREATE_ADVERT_FAIL,
  SELLER_CREATE_ADVERT_REQUEST,
  SELLER_CREATE_ADVERT_SUCCESS,
  SELLER_DELETE_ADVERT_FAIL,
  SELLER_DELETE_ADVERT_REQUEST,
  SELLER_DELETE_ADVERT_SUCCESS,
  SELLER_UPDATE_ADVERT_FAIL,
  SELLER_UPDATE_ADVERT_REQUEST,
  SELLER_UPDATE_ADVERT_SUCCESS,
  UPDATE_ADVERT_FAIL,
  UPDATE_ADVERT_REQUEST,
  UPDATE_ADVERT_SUCCESS,
} from "../constants/advertiseConstants";

import {
  SELLER_SINGLE_ORDER_FAIL,
  SELLER_SINGLE_ORDER_REQUEST,
  SELLER_SINGLE_ORDER_SUCCESS,
} from "../constants/sellerConstant";

const getAdminAdverts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ADVERTS_REQUEST });

    const { data } = await axios.get("/advert/", {
      withCredentials: true,
    });

    dispatch({ type: ADMIN_ADVERTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_ADVERTS_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const getSingleAdvert = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADVERT_DETAILS_REQUEST });

    const { data } = await axios.get(`/advert/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: ADVERT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADVERT_DETAILS_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const createAdvertAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADVERT_REQUEST });

    const { data } = await axios.post("/advert/new", order, {
      withCredentials: true,
    });

    dispatch({ type: CREATE_ADVERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ADVERT_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const deleteAdvertAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADVERT_REQUEST });

    const { data } = await axios.delete(`/advert/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: DELETE_ADVERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ADVERT_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const updateAdvertAction = (id, Advert) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADVERT_REQUEST });

    const { data } = await axios.put(`/advert/${id}`, Advert, {
      withCredentials: true,
    });

    dispatch({ type: UPDATE_ADVERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ADVERT_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const getSellerAdvertAction = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_ADVERTS_REQUEST });

    const { data } = await axios.get("/advert/seller", {
      withCredentials: true,
    });

    dispatch({ type: SELLER_ADVERTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_ADVERTS_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const createSellerAdvertAction = (form) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_CREATE_ADVERT_REQUEST });

    const { data } = await axios.post("/advert/seller", form, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_CREATE_ADVERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_CREATE_ADVERT_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const updateSellerAdvertAction = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_UPDATE_ADVERT_REQUEST });

    const { data } = await axios.put(`/advert/seller/${id}`, form, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_UPDATE_ADVERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_UPDATE_ADVERT_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const deleteSellerAdvertAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_DELETE_ADVERT_REQUEST });

    const { data } = await axios.delete(`/advert/seller/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_DELETE_ADVERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_DELETE_ADVERT_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const getSingleSellerAdvert = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_SINGLE_ORDER_REQUEST });

    const { data } = await axios.get(`/advert/seller/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: SELLER_SINGLE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_SINGLE_ORDER_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

export {
  //admin
  getAdminAdverts,
  getSingleAdvert,
  createAdvertAction,
  deleteAdvertAction,
  updateAdvertAction,

  // seller
  getSellerAdvertAction,
  createSellerAdvertAction,
  updateSellerAdvertAction,
  deleteSellerAdvertAction,
  getSingleSellerAdvert,
};
