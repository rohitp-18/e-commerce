import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/index";
// import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  cart: {
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
