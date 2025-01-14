import {
  CLEAR_ERRORS,
  SELLER_REVIEW_FAIL,
  SELLER_REVIEW_REQUEST,
  SELLER_REVIEW_SUCCESS,
} from "../constants/productConstants";
import {
  SELLER_CREATE_PRODUCT_FAIL,
  SELLER_CREATE_PRODUCT_REQUEST,
  SELLER_CREATE_PRODUCT_RESET,
  SELLER_CREATE_PRODUCT_SUCCESS,
  SELLER_DELETE_ORDER_FAIL,
  SELLER_DELETE_ORDER_REQUEST,
  SELLER_DELETE_ORDER_RESET,
  SELLER_DELETE_ORDER_SUCCESS,
  SELLER_DELETE_PRODUCT_FAIL,
  SELLER_DELETE_PRODUCT_REQUEST,
  SELLER_DELETE_PRODUCT_RESET,
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
  SELLER_UPDATE_ORDER_RESET,
  SELLER_UPDATE_ORDER_SUCCESS,
  SELLER_UPDATE_PRODUCT_FAIL,
  SELLER_UPDATE_PRODUCT_REQUEST,
  SELLER_UPDATE_PRODUCT_RESET,
  SELLER_UPDATE_PRODUCT_SUCCESS,
} from "../constants/sellerConstant";

const sellerProductReducer = (state, action) => {
  switch (action.type) {
    case SELLER_PRODUCTS_REQUEST:
    case SELLER_UPDATE_PRODUCT_REQUEST:
    case SELLER_CREATE_PRODUCT_REQUEST:
    case SELLER_DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };

    case SELLER_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case SELLER_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case SELLER_DELETE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case SELLER_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isCreated: true,
      };

    case SELLER_CREATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isCreated: false,
      };

    case SELLER_UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case SELLER_PRODUCTS_FAIL:
    case SELLER_DELETE_PRODUCT_FAIL:
    case SELLER_CREATE_PRODUCT_FAIL:
    case SELLER_UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return { ...state };
  }
};

const sellerOrderReducer = (state, action) => {
  switch (action.type) {
    case SELLER_ORDER_REQUEST:
    case SELLER_UPDATE_ORDER_REQUEST:
    case SELLER_SINGLE_ORDER_REQUEST:
    case SELLER_DELETE_ORDER_REQUEST:
      return { ...state, loading: true };

    case SELLER_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };

    case SELLER_DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case SELLER_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case SELLER_DELETE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case SELLER_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
      };

    case SELLER_UPDATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case SELLER_ORDER_FAIL:
    case SELLER_DELETE_ORDER_FAIL:
    case SELLER_SINGLE_ORDER_FAIL:
    case SELLER_UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return { ...state };
  }
};

const sellerReviewReducer = (state, action) => {
  switch (action.type) {
    case SELLER_REVIEW_REQUEST:
      return { ...state, loading: true };

    case SELLER_REVIEW_SUCCESS:
      return { ...state, loading: false, reviews: action.payload.reviews };

    case SELLER_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return { ...state };
  }
};

export { sellerProductReducer, sellerOrderReducer, sellerReviewReducer };
