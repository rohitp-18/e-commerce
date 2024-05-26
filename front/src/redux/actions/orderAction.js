import {
  CLEAR_ERRORS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  ADMIN_ORDER_FAIL,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  SINGLE_ORDER_FAIL,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
} from "../constants/orderConstants";
import axios from "../axios";

const newOrderAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ORDER_REQUEST });

    const { data } = await axios.post("/order/create", order, {
      withCredentials: true,
    });

    dispatch({ type: NEW_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: NEW_ORDER_FAIL, payload: error.response.data.message });
  }
};

const getOrderDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const { data } = await axios.get(`/order/my/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAIL_FAIL, payload: error.response.data.message });
  }
};

const getMyOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get("/order", { withCredentials: true });

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message.response,
    });
  }
};

const getAdminOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDER_REQUEST });

    const { data } = await axios.get("/order/admin", {
      withCredentials: true,
    });

    dispatch({ type: ADMIN_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_FAIL,
      payload: error.response.data.message.response,
    });
  }
};

const deleteOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/order/admin/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};

const updateOrderAction = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const { data } = await axios.put(`/order/admin/${id}`, status, {
      withCredentials: true,
    });

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

const adminsingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_ORDER_REQUEST });

    const { data } = await axios.get(`/order/admin/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: SINGLE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLE_ORDER_FAIL, payload: error.response.data.message });
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export {
  newOrderAction,
  getOrderDetailsAction,
  getMyOrdersAction,
  clearErrors,
  getAdminOrders,
  deleteOrderAction,
  updateOrderAction,
  adminsingleOrder,
};
