import axios from "../axios";
import {
  SEARCH_REQUEST,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
  ADMIN_SEARCH_REQUEST,
  ADMIN_SEARCH_SUCCESS,
  ADMIN_SEARCH_FAIL,
  DELETE_SEARCH_REQUEST,
  DELETE_SEARCH_SUCCESS,
  DELETE_SEARCH_FAIL,
  UPDATE_SEARCH_REQUEST,
  UPDATE_SEARCH_SUCCESS,
  UPDATE_SEARCH_FAIL,
  ADMIN_DELETE_SEARCH_REQUEST,
  ADMIN_DELETE_SEARCH_SUCCESS,
  ADMIN_DELETE_SEARCH_FAIL,
  ADMIN_CREATE_SEARCH_REQUEST,
  ADMIN_CREATE_SEARCH_SUCCESS,
  ADMIN_CREATE_SEARCH_FAIL,
  CREATE_SEARCH_REQUEST,
  CREATE_SEARCH_SUCCESS,
  CREATE_SEARCH_FAIL,
} from "../constants/searchConstants";

const searchAction = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_REQUEST });

    const { data } = await axios.get(`/search/searches?query=${searchTerm}`);

    dispatch({ type: SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEARCH_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const getAdminSearch = (word) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SEARCH_REQUEST });

    const { data } = await axios.get(`/search/admin/searches?query=${word}`);

    dispatch({ type: ADMIN_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_SEARCH_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SEARCH_REQUEST });

    const { data } = await axios.delete(`/search/search/${id}`);

    dispatch({ type: DELETE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_SEARCH_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const updateAction = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SEARCH_REQUEST });

    const { data } = await axios.put(`/search/admin/search/${id}`, formData);

    dispatch({ type: UPDATE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SEARCH_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const adminDeleteSearch = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_SEARCH_REQUEST });

    const { data } = await axios.delete(`/search/admin/search/${id}`);

    dispatch({ type: ADMIN_DELETE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_SEARCH_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const createSearch = (searchData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SEARCH_REQUEST });

    const { data } = await axios.post("/search/create", searchData);

    dispatch({ type: CREATE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SEARCH_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

const adminCreateSearch = (searchData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CREATE_SEARCH_REQUEST });

    const { data } = await axios.post("/search/admin/create", searchData);

    dispatch({ type: ADMIN_CREATE_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_SEARCH_FAIL,
      payload: error.response?.data.message || "Internal error",
    });
  }
};

export {
  searchAction,
  getAdminSearch,
  deleteProduct,
  updateAction,
  adminDeleteSearch,
  createSearch,
  adminCreateSearch,
};
