import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      let isExit = state.cartItems.find((i) => i.product === item.product);

      if (isExit) {
        state.cartItems.map(
          (i) => i.product === item.product && (i.quantity = item.quantity)
        );
        console.log(state);
        return {
          ...state,
        };
      } else {
        state.cartItems.push(item);
        return {
          ...state,
        };
      }

    case REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
