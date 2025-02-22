import axios from "../axios";
import {
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_SUCCESS,
  HOME_PRODUCTS_FAIL,
} from "../constants/homeConstant";

const getHomePage = () => async (dispatch) => {
  try {
    dispatch({ type: HOME_PRODUCTS_REQUEST });

    const { data } = await axios.get("/product/home", {
      withCredentials: true,
    });

    dispatch({ type: HOME_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HOME_PRODUCTS_FAIL,
      payload: error.response?.data.message,
    });
  }
};

export { getHomePage };
