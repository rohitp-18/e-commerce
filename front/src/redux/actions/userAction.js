import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOAD_FAIL,
  LOAD_SUCCESS,
  LOAD_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  ADMIN_USERS_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_ID_REQUEST,
  FORGOT_PASSWORD_ID_SUCCESS,
  FORGOT_PASSWORD_ID_FAIL,
  FORGOT_PASSWORD_CHANGE_REQUEST,
  FORGOT_PASSWORD_CHANGE_SUCCESS,
  FORGOT_PASSWORD_CHANGE_FAIL,
} from "../constants/userConstants";
import axios from "../axios";

const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const { data } = await axios.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

const signupAction = (form) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    const { data } = await axios.post("/user/register", form, {
      withCredentials: true,
    });

    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response.data.message,
    });
  }
};

const loadRequest = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const { data } = await axios.get("/user", { withCredentials: true });

    dispatch({ type: LOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
    });
  }
};

const logoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    await axios.get("/user/logout", { withCredentials: true });

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

const updateUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    await axios.put("/user/update", data, { withCredentials: true });

    dispatch({ type: UPDATE_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
  }
};

const updatePassword =
  (oldPassword, password, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const { data } = await axios.put(
        "/user/update/password",
        { password, oldPassword, confirmPassword: newPassword },
        { withCredentials: true }
      );

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

const getAdminUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USERS_REQUEST });

    const { data } = await axios.get("/user/admin", { withCredentials: true });

    dispatch({ type: ADMIN_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ADMIN_USERS_FAIL, payload: error.response.data.message });
  }
};

const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/user/admin/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
  }
};

const detailsUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/user/admin/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

const updateAdminUser = (id, user) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST });

    const { data } = await axios.put(`/user/admin/${id}`, user, {
      withCredentials: true,
    });

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

const forgotPasswordRequest = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await axios.post(
      "/user/forgot/password",
      { email },
      { withCredentials: true }
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

const forgotPasswordId = (id) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_ID_REQUEST });

    const { data } = await axios.get(`/user/forgot/password/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: FORGOT_PASSWORD_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

const forgotPasswordChange = (password, id) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_CHANGE_REQUEST });

    const { data } = await axios.post(
      `/user/forgot/password/${id}`,
      { password },
      { withCredentials: true }
    );

    dispatch({ type: FORGOT_PASSWORD_CHANGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_CHANGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  loginAction,
  signupAction,
  updateUser,
  loadRequest,
  logoutAction,
  updatePassword,
  getAdminUsers,
  deleteUser,
  detailsUser,
  updateAdminUser,
  forgotPasswordRequest,
  forgotPasswordId,
  forgotPasswordChange,
};
