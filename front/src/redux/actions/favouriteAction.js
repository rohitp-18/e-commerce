import axios from "../axios";
import {
  GET_ALL_FAVOURITE_FAIL,
  GET_ALL_FAVOURITE_REQUEST,
  GET_ALL_FAVOURITE_SUCCESS,
  GET_ALL_VIEW_FAIL,
  GET_ALL_VIEW_REQUEST,
  GET_ALL_VIEW_SUCCESS,
  ADD_FAVOURITE_FAIL,
  ADD_FAVOURITE_REQUEST,
  ADD_FAVOURITE_SUCCESS,
  REMOVE_FAVOURITE_FAIL,
  REMOVE_FAVOURITE_REQUEST,
  REMOVE_FAVOURITE_SUCCESS,
} from "../constants/favouriteConstant";

const getAllFavouriteProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FAVOURITE_REQUEST });

    const { data } = await axios.get("/view/fav");

    dispatch({ type: GET_ALL_FAVOURITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FAVOURITE_FAIL,
      payload: error.response?.data.message,
    });
  }
};

const getAllViewProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_VIEW_REQUEST });

    const { data } = await axios.get("/view/view");

    dispatch({ type: GET_ALL_VIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_VIEW_FAIL,
      payload: error.response?.data.message,
    });
  }
};

const addToFavouriteAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_FAVOURITE_REQUEST });

    const { data } = await axios.post("/view/fav/new", { product: productId });

    dispatch({ type: ADD_FAVOURITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_FAVOURITE_FAIL,
      payload: error.response?.data.message,
    });
  }
};

const removeFromFavouriteAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FAVOURITE_REQUEST });

    const { data } = await axios.delete(`/view/fav/${productId}`);

    dispatch({ type: REMOVE_FAVOURITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_FAVOURITE_FAIL,
      payload: error.response?.data.message,
    });
  }
};

export {
  getAllFavouriteProducts,
  getAllViewProducts,
  addToFavouriteAction,
  removeFromFavouriteAction,
};
