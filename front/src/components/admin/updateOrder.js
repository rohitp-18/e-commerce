import React, { useContext, useEffect, useState } from "react";
import "./updateOrder.scss";
import Slider from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  adminsingleOrder,
  clearErrors,
  updateOrderAction,
} from "../../redux/actions/orderAction";
import { useNavigate, useParams } from "react-router-dom";
import { Box, MenuItem, Select } from "@mui/material";
import { ShoppingCartCheckoutSharp } from "@mui/icons-material";
import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstants";
import Loader from "../layout/Loader";
import { AlertContext } from "../layout/alertProvider";
import MetaData from "../layout/header/MetaData";

function UpdateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext);
  const { order, isUpdated, loading, error } = useSelector(
    (state) => state.updateOrder
  );
  const { id } = useParams();
  const [status, setStatus] = useState("Processing");

  const submitHandler = () => {
    if (status === "Processing") {
      //
    }

    dispatch(updateOrderAction(id, status));
  };

  useEffect(() => {
    console.log("first");
    if (error) {
      sendAlert(error, "error");
      dispatch(clearErrors);
    }
    if (isUpdated) {
      sendAlert("Order is Updated successfully", "success");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }
    dispatch(adminsingleOrder(id));

    order && setStatus(order.orderStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isUpdated, sendAlert, error, id, navigate]);
  return (
    <>
      <MetaData title="update order- Admin" />
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

export default UpdateOrder;
