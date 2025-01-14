import {
  ADMIN_ADVERTS_FAIL,
  ADMIN_ADVERTS_REQUEST,
  ADMIN_ADVERTS_SUCCESS,
  ADVERT_DETAILS_FAIL,
  ADVERT_DETAILS_REQUEST,
  ADVERT_DETAILS_SUCCESS,
  CREATE_ADVERT_FAIL,
  CREATE_ADVERT_REQUEST,
  CREATE_ADVERT_RESET,
  CREATE_ADVERT_SUCCESS,
  DELETE_ADVERT_FAIL,
  DELETE_ADVERT_REQUEST,
  DELETE_ADVERT_RESET,
  DELETE_ADVERT_SUCCESS,
  SELLER_ADVERTS_FAIL,
  SELLER_ADVERTS_REQUEST,
  SELLER_ADVERTS_SUCCESS,
  SELLER_CREATE_ADVERT_FAIL,
  SELLER_CREATE_ADVERT_REQUEST,
  SELLER_CREATE_ADVERT_RESET,
  SELLER_CREATE_ADVERT_SUCCESS,
  SELLER_DELETE_ADVERT_FAIL,
  SELLER_DELETE_ADVERT_REQUEST,
  SELLER_DELETE_ADVERT_RESET,
  SELLER_DELETE_ADVERT_SUCCESS,
  SELLER_SINGLE_ADVERT_FAIL,
  SELLER_SINGLE_ADVERT_REQUEST,
  SELLER_SINGLE_ADVERT_SUCCESS,
  SELLER_UPDATE_ADVERT_FAIL,
  SELLER_UPDATE_ADVERT_REQUEST,
  SELLER_UPDATE_ADVERT_RESET,
  SELLER_UPDATE_ADVERT_SUCCESS,
  UPDATE_ADVERT_FAIL,
  UPDATE_ADVERT_REQUEST,
  UPDATE_ADVERT_RESET,
  UPDATE_ADVERT_SUCCESS,
} from "../constants/advertiseConstants";
import { CLEAR_ERRORS } from "../constants/productConstants";

const sellerAdvertReducer = (state, action) => {
  switch (action.type) {
    case SELLER_ADVERTS_REQUEST:
    case SELLER_SINGLE_ADVERT_REQUEST:
    case SELLER_UPDATE_ADVERT_REQUEST:
    case SELLER_CREATE_ADVERT_REQUEST:
    case SELLER_DELETE_ADVERT_REQUEST:
      return { ...state, loading: true };

    case SELLER_ADVERTS_SUCCESS:
      return {
        ...state,
        loading: false,
        advertisements: action.payload.advertisements,
      };

    case SELLER_SINGLE_ADVERT_SUCCESS:
      return {
        ...state,
        loading: false,
        advertisement: action.payload.advertisement,
      };

    case SELLER_DELETE_ADVERT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case SELLER_UPDATE_ADVERT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case SELLER_DELETE_ADVERT_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case SELLER_CREATE_ADVERT_SUCCESS:
      return {
        ...state,
        loading: false,
        isCreated: true,
      };

    case SELLER_CREATE_ADVERT_RESET:
      return {
        ...state,
        loading: false,
        isCreated: false,
      };

    case SELLER_UPDATE_ADVERT_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case SELLER_ADVERTS_FAIL:
    case SELLER_SINGLE_ADVERT_FAIL:
    case SELLER_DELETE_ADVERT_FAIL:
    case SELLER_CREATE_ADVERT_FAIL:
    case SELLER_UPDATE_ADVERT_FAIL:
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

const adminAdvertReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ADVERT_REQUEST:
    case UPDATE_ADVERT_REQUEST:
    case ADMIN_ADVERTS_REQUEST:
    case ADVERT_DETAILS_REQUEST:
    case DELETE_ADVERT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_ADVERTS_SUCCESS:
      return {
        ...state,
        loading: false,
        advertisements: action.payload.advertisements,
      };

    case ADVERT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        advertisement: action.payload.advertisement,
      };

    case CREATE_ADVERT_SUCCESS:
      return {
        ...state,
        isCreated: action.payload.success,
        loading: false,
      };

    case UPDATE_ADVERT_SUCCESS:
      return {
        ...state,
        isUpdated: action.payload.success,
        loading: false,
      };

    case DELETE_ADVERT_SUCCESS:
      return {
        ...state,
        isDeleted: action.payload.success,
        loading: false,
      };

    case CREATE_ADVERT_FAIL:
    case ADMIN_ADVERTS_FAIL:
    case ADVERT_DETAILS_FAIL:
    case DELETE_ADVERT_FAIL:
    case UPDATE_ADVERT_FAIL:
      return {
        ...state,
        loading: false,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
        error: action.payload,
      };

    case CREATE_ADVERT_RESET:
    case DELETE_ADVERT_RESET:
    case UPDATE_ADVERT_RESET:
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

export { adminAdvertReducer, sellerAdvertReducer };
