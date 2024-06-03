import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loadRequest } from "./redux/actions/userAction";
import store from "./redux/store";
import Footer from "./components/layout/footer/footer";
import Product from "./components/product/product";
import Home from "./components/home/home";
import Navbar from "./components/layout/header/navbar";
import LoginSignup from "./components/user/loginSignup";
import Search from "./components/search/search";
import Tooltip from "./components/layout/header/tooltip";
import ProtectRoute from "./components/layout/protectRoute";
import AccountInfo from "./components/user/account";
import UpadateUser from "./components/user/updateUser";
import UpdatePassword from "./components/user/updatePassword";
import Cart from "./components/cart/cart";
import Shipping from "./components/cart/shipping";
import Success from "./components/cart/success";
import ConfirmOrder from "./components/cart/confirmOrder";
import Payment from "./components/cart/payment";
import AllOrders from "./components/order/allOrders";
import SingleOrder from "./components/order/singleOrder";
import AdminHome from "./components/admin/adminHome";
import Products from "./components/admin/Products";
import CreateProduct from "./components/admin/createProduct";
import UpdateProduct from "./components/admin/updateProduct";
import Orders from "./components/admin/orders";
import UpdateOrder from "./components/admin/updateOrder";
import Users from "./components/admin/users";
import UpdateUser from "./components/admin/updateUser";
import Review from "./components/admin/review";
import PageNot from "./components/layout/pageNot";
import { AlertProvider } from "./components/layout/alertProvider";
import MetaData from "./components/layout/header/MetaData";
import "./App.scss";
import ForgotPassword from "./components/user/forgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Back from "./components/layout/header/Back";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MetaData title="HOME - Products" />
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/search",
    element: (
      <>
        <MetaData title="HOME - Products" />
        <Navbar />
        <Tooltip />
        <Search />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <MetaData title="HOME - Products" />
        <Navbar />
        <Tooltip />
        <Product />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <MetaData title="HOME - Products" />
        <LoginSignup />
      </>
    ),
  },
  {
    path: "/account",
    element: (
      <ProtectRoute>
        <Navbar />
        <Tooltip />
        <AccountInfo />
      </ProtectRoute>
    ),
  },
  {
    path: "/password/forgot",
    element: (
      <>
        <MetaData title="Forgot Password" />
        <Back />
        <ForgotPassword />
      </>
    ),
  },
  {
    path: "/password/forgot/:id",
    element: (
      <>
        <MetaData title="Reset Password" />
        <Back />
        <ResetPassword />
      </>
    ),
  },
  {
    path: "/user/update",
    element: (
      <ProtectRoute>
        <MetaData title="Update Profile" />
        <Back />
        <Tooltip />
        <UpadateUser />
      </ProtectRoute>
    ),
  },
  {
    path: "/user/password",
    element: (
      <ProtectRoute>
        <MetaData title="Change Password" />
        <Back />
        <Tooltip />
        <UpdatePassword />
      </ProtectRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectRoute>
        <MetaData title="Cart" />
        <Navbar />
        <Tooltip />
        <Cart />
      </ProtectRoute>
    ),
  },
  {
    path: "/shipping",
    element: (
      <ProtectRoute>
        <MetaData title="Shipping Info" />
        <Back />
        <Tooltip />
        <Shipping />
      </ProtectRoute>
    ),
  },
  {
    path: "/order/confirm",
    element: (
      <ProtectRoute>
        <MetaData title="HOME - Products" />
        <Back />
        <Tooltip />
        <ConfirmOrder />
      </ProtectRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <ProtectRoute>
        <MetaData title="HOME - Products" />
        <Back />
        <Tooltip />
        <Payment />
      </ProtectRoute>
    ),
  },
  {
    path: "/success",
    element: (
      <ProtectRoute>
        <MetaData title="HOME - Products" />
        <Navbar />
        <Tooltip />
        <Success />
      </ProtectRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectRoute>
        <MetaData title="HOME - Products" />
        <Navbar />
        <Tooltip />
        <AllOrders />
      </ProtectRoute>
    ),
  },
  {
    path: "/orders/:id",
    element: (
      <ProtectRoute>
        <MetaData title="HOME - Products" />
        <Navbar />
        <Tooltip />
        <SingleOrder />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <AdminHome />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <Products />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/product/new",
    element: (
      <ProtectRoute user="admin">
        <MetaData title="Create New Product" />
        <Tooltip />
        <CreateProduct />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/products/:id",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <UpdateProduct />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <Orders />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/orders/:id",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <UpdateOrder />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <Users />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/users/:id",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <UpdateUser />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/reviews",
    element: (
      <ProtectRoute user="admin">
        <Tooltip />
        <Review />
      </ProtectRoute>
    ),
  },

  {
    path: "*",
    element: (
      <>
        <PageNot />
      </>
    ),
  },
]);

function App() {
  useEffect(() => {
    store.dispatch(loadRequest());
  });
  return (
    <>
      <AlertProvider>
        <RouterProvider router={router} />
        <Footer />
      </AlertProvider>
    </>
  );
}

export default App;
