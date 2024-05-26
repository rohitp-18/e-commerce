import React from "react";
import "./success.scss";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigator = useNavigate();
  return (
    <>
      <section className="order-success">
        <CheckCircle />
        <h2>Your Order has been placed successfuly</h2>
        <button onClick={() => navigator("/orders")}>View Order</button>
      </section>
    </>
  );
}

export default Success;
