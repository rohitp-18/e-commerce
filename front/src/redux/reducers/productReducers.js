import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  REVIEW_SUBMIT_FAIL,
  REVIEW_SUBMIT_REQUEST,
  REVIEW_SUBMIT_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";

const allProducts = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };

    case ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProduct: action.payload,
      };

    case GET_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
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

const productDetails = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return (state = { loading: true });

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const reviewSubmit = (state, action) => {
  switch (action.type) {
    case REVIEW_SUBMIT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REVIEW_SUBMIT_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };

    case REVIEW_SUBMIT_FAIL:
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

const createProductReducer = (state, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isCreated: action.payload.success,
        loading: false,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isUpdated: action.payload.success,
        loading: false,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isDeleted: action.payload.success,
        loading: false,
      };

    case CREATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
        error: action.payload,
      };

    case CREATE_PRODUCT_RESET:
    case DELETE_PRODUCT_RESET:
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
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
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
        loading: false,
      };
  }
};

const updateReviewReducer = (state, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };

    case ALL_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        isDeleted: false,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return {
        ...state,
        isDeleted: false,
        loading: false,
      };
  }
};

export {
  allProducts,
  createProductReducer,
  updateReviewReducer,
  reviewSubmit,
  productDetails,
};
