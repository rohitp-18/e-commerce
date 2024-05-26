import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOAD_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  ADMIN_USERS_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_RESET,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  LOGIN_RESET,
} from "../constants/userConstants";

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_REQUEST:
    case LOGOUT_REQUEST:
    case SIGNUP_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        message: "Log in Successsfuly",
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        message: "Sign in Successfully",
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        message: action.payload.message,
      };

    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
      };

    case LOGIN_RESET:
      return {
        ...state,
        loading: false,
        message: null,
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

const getAllUsers = (state, action) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ADMIN_USERS_FAIL:
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

const updateUserReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdated: action.payload.success,
        loading: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleted: action.payload,
        loading: false,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };

    case DELETE_USER_FAIL:
    case USER_DETAILS_FAIL:
    case ADMIN_UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        isDeleted: false,
        error: action.payload,
      };

    case DELETE_USER_RESET:
    case ADMIN_UPDATE_USER_RESET:
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

const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };

    case UPDATE_USER_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdate: false,
        loading: false,
      };
    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isUpdate: false,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        isUpdate: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export { getAllUsers, userReducer, updateReducer, updateUserReducer };
