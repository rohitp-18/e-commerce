import React, { useContext, useEffect, useState } from "react";
import Slider from "./sellerNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, MenuItem, Select } from "@mui/material";
import { ShoppingCartCheckoutSharp } from "@mui/icons-material";
import { CLEAR_ERRORS } from "../../redux/constants/orderConstants";
import Loader from "../layout/Loader";
import { AlertContext } from "../layout/alertProvider";
import MetaData from "../layout/header/MetaData";
import {
  getSingleSellerOrder,
  updateSellerOrderAction,
} from "../../redux/actions/sellerAction";
import { SELLER_UPDATE_ORDER_RESET } from "../../redux/constants/sellerConstant";

function SellerUpdateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext);
  const { order, isUpdated, loading, error } = useSelector(
    (state) => state.sellerOrder
  );
  const { id } = useParams();
  const [status, setStatus] = useState("processing");

  const submitHandler = () => {
    if (status === "processing") {
      //
    }

    dispatch(updateSellerOrderAction(id, status));
  };

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    if (isUpdated) {
      sendAlert("Order is Updated successfully", "success");
      dispatch({ type: SELLER_UPDATE_ORDER_RESET });
      navigate("/seller/orders");
    }
    dispatch(getSingleSellerOrder(id));

    order && setStatus(order.orderStatus);
  }, [dispatch, isUpdated, sendAlert, error, id]);
  return (
    <>
      <MetaData title="update order- Seller" />
      <div className="admin">
        <Slider />
        {loading ? (
          <Loader />
        ) : (
          <>
            {order && (
              <section className="admin-update-order">
                <div className="shipping-order">
                  <div className="shipping-info">
                    <h3>Shipping info</h3>
                    <div>
                      <p>
                        Name: <span>{order.user.name}</span>
                      </p>
                      <p>
                        Phone: <span>{order.shippingInfo.phone}</span>
                      </p>
                      <p>
                        Address: <span>{order.shippingInfo.address}</span>
                      </p>
                    </div>
                  </div>
                  <div className="payment">
                    <h3>Payment</h3>
                    <div>
                      <p>{order.paidAt ? "PAID" : "UNPAID"}</p>
                      <p>
                        Amount: <span>{order.totalPrice}</span>
                      </p>
                    </div>
                  </div>
                  <div className="status">
                    <h3>Order Status</h3>
                    <p>{order.orderStatus}</p>
                  </div>
                  <div className="cart-items">
                    <h3>Your Cart Items</h3>
                    <div className="item-card cart-card">
                      <div className="cart-img">
                        <img
                          src={order.orderItems.image}
                          alt={order.orderItems.name}
                        />
                        <p>{order.orderItems.name}</p>
                      </div>
                      <div className="cart-price">
                        {order.orderItems.quantity} x ₹{order.orderItems.price}{" "}
                        =
                        <span>
                          ₹{order.orderItems.price * order.orderItems.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="process-order">
                  <p>PROCESS ORDER</p>
                  <Box sx={{ minWidth: 200 }}>
                    <Select
                      startAdornment={<ShoppingCartCheckoutSharp />}
                      sx={{ padding: "0 5px", width: "30ch" }}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value={"processing"}>Processing</MenuItem>
                      <MenuItem value={"shipped"}>Shipped</MenuItem>
                      <MenuItem value={"delivered"}>Delivered</MenuItem>
                      <MenuItem value={"cancled"}>Cancled</MenuItem>
                    </Select>
                  </Box>
                  <button onClick={submitHandler}>PROCESS</button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SellerUpdateOrder;
