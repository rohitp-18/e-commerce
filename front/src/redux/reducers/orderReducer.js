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
  NEW_ORDER_RESET,
  ADMIN_ORDER_FAIL,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
  SINGLE_ORDER_FAIL,
} from "../constants/orderConstants";

const createNewOrder = (state, action) => {
  switch (action.type) {
    case NEW_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ORDER_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        loading: false,
      };

    case NEW_ORDER_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };

    case NEW_ORDER_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

const orderReducers = (state, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };

    case ALL_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return {
        ...state,
        loading: false,
      };
  }
};

const orderDetailsReducer = (state, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
      };

    case ORDER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return {
        ...state,
        loading: false,
      };
  }
};

const adminGetAllorders = (state, action) => {
  switch (action.type) {
    case ADMIN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case ADMIN_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return { ...state, loading: false };
  }
};

const updateOrderReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
    case SINGLE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isUpdated: action.payload.success,
        loading: false,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isDeleted: action.payload.success,
        loading: false,
      };

    case DELETE_ORDER_FAIL:
    case UPDATE_ORDER_FAIL:
    case SINGLE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        isDeleted: false,
        error: action.payload,
      };

    case DELETE_ORDER_RESET:
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        isDeleted: false,
        error: null,
      };

    default:
      return {
        ...state,
        isUpdated: false,
        isDeleted: false,
        loading: false,
      };
  }
};

export {
  createNewOrder,
  orderReducers,
  adminGetAllorders,
  orderDetailsReducer,
  updateOrderReducer,
};
