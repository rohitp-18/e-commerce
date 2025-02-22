import { combineReducers } from "redux";
import {
  allProducts,
  reviewSubmit,
  createProductReducer,
  productDetails,
  updateReviewReducer,
} from "./productReducers";
import {
  userReducer,
  getAllUsers,
  updateReducer,
  updateUserReducer,
  forgotPasswordReducer,
} from "./userReducers";
import cartReducer from "./cartReducers";
import {
  createNewOrder,
  orderReducers,
  orderDetailsReducer,
  adminGetAllorders,
  updateOrderReducer,
} from "./orderReducer";
import {
  sellerOrderReducer,
  sellerProductReducer,
  sellerReviewReducer,
} from "./sellerReducer";
import { adminAdvertReducer, sellerAdvertReducer } from "./advertiseReducer";
import { homeReducer } from "./homeReducer";

const reducer = combineReducers({
  allProducts: allProducts,
  product: productDetails,
  user: userReducer,
  update: updateReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: createNewOrder,
  orders: orderReducers,
  orderDetails: orderDetailsReducer,
  review: reviewSubmit,
  allUsers: getAllUsers,
  allOrders: adminGetAllorders,
  updateOrder: updateOrderReducer,
  updateUser: updateUserReducer,
  updateProduct: createProductReducer,
  updateReview: updateReviewReducer,
  sellerOrder: sellerOrderReducer,
  sellerProduct: sellerProductReducer,
  advert: adminAdvertReducer,
  sellerAdvert: sellerAdvertReducer,
  sellerReview: sellerReviewReducer,
  homeReducer: homeReducer,
});

export default reducer;
