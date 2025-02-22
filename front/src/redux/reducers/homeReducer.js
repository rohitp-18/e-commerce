import {
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_SUCCESS,
  HOME_PRODUCTS_FAIL,
} from "../constants/homeConstant";

const homeReducer = (state = {}, action) => {
  switch (action.type) {
    case HOME_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case HOME_PRODUCTS_SUCCESS:
      return {
        loading: false,
        home: action.payload,
      };

    case HOME_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export { homeReducer };
