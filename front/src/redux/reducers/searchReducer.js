const {
  SEARCH_FAIL,
  SEARCH_REQUEST,
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
  ADMIN_DELETE_SEARCH_RESET,
  UPDATE_SEARCH_RESET,
  DELETE_SEARCH_RESET,
  ADMIN_CREATE_SEARCH_REQUEST,
  ADMIN_CREATE_SEARCH_SUCCESS,
  ADMIN_CREATE_SEARCH_FAIL,
  ADMIN_CREATE_SEARCH_RESET,
  CREATE_SEARCH_REQUEST,
  CREATE_SEARCH_SUCCESS,
  CREATE_SEARCH_FAIL,
  CREATE_SEARCH_RESET,
  CLEAR_ERRORS,
} = require("../constants/searchConstants");

const searchReducer = (state = { searches: [] }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
    case ADMIN_SEARCH_REQUEST:
    case DELETE_SEARCH_REQUEST:
    case UPDATE_SEARCH_REQUEST:
    case ADMIN_DELETE_SEARCH_REQUEST:
    case ADMIN_CREATE_SEARCH_REQUEST:
    case CREATE_SEARCH_REQUEST:
      return { ...state, loading: true };

    case ADMIN_CREATE_SEARCH_SUCCESS:
    case CREATE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isCreated: true,
      };

    case SEARCH_SUCCESS:
    case ADMIN_SEARCH_SUCCESS:
      return { ...state, loading: false, searches: action.payload.searches };

    case DELETE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case UPDATE_SEARCH_SUCCESS:
      return {
        ...state,
        isUpdated: true,
        loading: false,
      };

    case ADMIN_DELETE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case DELETE_SEARCH_FAIL:
    case UPDATE_SEARCH_FAIL:
    case ADMIN_DELETE_SEARCH_FAIL:
    case ADMIN_CREATE_SEARCH_FAIL:
    case CREATE_SEARCH_FAIL:
      return { ...state, loading: false, requestError: action.payload };

    case ADMIN_SEARCH_FAIL:
    case SEARCH_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_SEARCH_RESET:
    case UPDATE_SEARCH_RESET:
    case ADMIN_DELETE_SEARCH_RESET:
    case ADMIN_CREATE_SEARCH_RESET:
    case CREATE_SEARCH_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        isDeleted: false,
        isUpdated: false,
        isCreated: false,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null, requestError: null };

    default:
      return state;
  }
};
export default searchReducer;
