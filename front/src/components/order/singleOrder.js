import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsAction } from "../../redux/actions/orderAction";
import { useParams } from "react-router-dom";
import "./singleOrder.scss";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";

function SingleOrder() {
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetailsAction(id));
    console.log(order);
  }, [dispatch, id]);
  return (
    <>
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <section className="single-order">
          {order && (
            <>
              <h1>Order #{order._id}</h1>
              <div className="shipping-info">
                <h2>Shipping info</h2>
                <div>
                  <p>
                    Name: <span>{order.shippingInfo.name}</span>
                  </p>
                  <p>
                    Phone: <span>{order.shippingInfo.phone}</span>
                  </p>
                  <p>
                    Address: <span>{order.shippingInfo.address}</span>
                  </p>
                </div>
              </div>
              <div className="shipping-info">
                <h2>Payment</h2>
                <div>
                  <p>
                    Paid: <span>{order.paid && "Paid"}</span>
                  </p>
                  <p>
                    Amount: <span>{order.totalPrice}</span>
                  </p>
                </div>
              </div>{" "}
              <div className="shipping-info">
                <h2>Order Status</h2>
                <div>
                  <p>{order.orderStatus}</p>
                </div>
              </div>
              <div className="order-items">
                <h2>Your Cart Items</h2>
                {order.orderItems.map((item) => (
                  <div className="item-card" key={item.product}>
                    <div className="item-img">
                      <img src={item.image} alt={item.name} />
                      <p>{item.name}</p>
                    </div>
                    <div className="item-price">
                      {item.quantity} x ₹{item.price} =
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}

export default SingleOrder;
