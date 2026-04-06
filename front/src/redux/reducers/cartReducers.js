import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  ALL_TEMP_CART,
  CLEAR_ERRORS,
  CLEAR_TEMP_CART,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  ID_TEMP_CART,
  REMOVE_TO_CART_SUCCESS,
  SAVE_SHIPPING_INFO,
  UPDATE_CART_FAIL,
  UPDATE_CART_SUCCESS,
} from "../constants/cartConstants";
import { REMOVE_FAVOURITE_FAIL } from "../constants/favouriteConstant";

const cartReducer = (state = { cartItems: [], tempItems: [] }, action) => {
  switch (action.type) {
    case UPDATE_CART_SUCCESS:
      if (state.cartItems && Array.isArray(state.cartItems)) {
        state.cartItems = state.cartItems.map((c) => {
          if (c._id === action.payload._id) {
            console.log(action.payload);
            c.quantity = action.payload.quantity;
          }
          return c;
        });
      }
      return {
        ...state,
      };

    case UPDATE_CART_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case ADD_TO_CART_SUCCESS:
      if (state.cartItems && Array.isArray(state.cartItems)) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems = [action.payload];
      }
      return {
        ...state,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case REMOVE_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems:
          state.cartItems && Array.isArray(state.cartItems)
            ? state.cartItems.filter((i) => i._id !== action.payload)
            : [],
      };

    case REMOVE_FAVOURITE_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case ALL_TEMP_CART:
      return {
        ...state,
        tempItems: action.payload,
      };
    case CLEAR_TEMP_CART:
      return {
        ...state,
        tempItems: null,
      };

    case ID_TEMP_CART:
      return {
        ...state,
        tempItems: [...action.payload],
      };

    case GET_CART_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default cartReducer;
