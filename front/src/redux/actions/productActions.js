import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  REVIEW_SUBMIT_REQUEST,
  REVIEW_SUBMIT_SUCCESS,
  REVIEW_SUBMIT_FAIL,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
} from "../constants/productConstants";
import axios from "../axios";

const getAllProducts =
  (category, price = [0, 100000], keyword = "", ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_REQUEST });

      const { data } = await axios.get(
        `/product?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
      );

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

const submitReview = (id, review) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_SUBMIT_REQUEST });

    const { data } = await axios.post(`/product/${id}/review/new`, review, {
      withCredentials: true,
    });

    dispatch({ type: REVIEW_SUBMIT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: REVIEW_SUBMIT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get("/product/admin", {
      withCredentials: true,
    });

    dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

const createproductAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await axios.post("/product/new", order, {
      withCredentials: true,
    });

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/product/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateProductAction = (id, product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await axios.put(`/product/${id}`, product, {
      withCredentials: true,
    });

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getAllReviewAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/product/${id}/review`, {
      withCredentials: true,
    });

    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_REVIEW_FAIL, payload: error.response.data.message });
  }
};

const deleteReviewAction = (id, rev) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(`/product/${id}/review?revId=${rev}`, {
      withCredentials: true,
    });

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  getAllProducts,
  submitReview,
  createproductAction,
  getAdminProducts,
  getProductDetails,
  updateProductAction,
  deleteProductAction,
  getAllReviewAction,
  deleteReviewAction,
};
