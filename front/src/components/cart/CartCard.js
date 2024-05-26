import React from "react";
import "./cartCard.scss";

function CartCard({ item, deleteCart }) {
  return (
    <div className="cart-product">
      <div className="img">
        <img alt={item.name} src={item.image} />
      </div>
      <div className="cart-info">
        <h3>{item.name}</h3>
        <div>
          <span>Price :{"  "}</span>
          <h5>₹{item.price}</h5>
        </div>
        <button onClick={() => deleteCart(item.product)}>Remove</button>
      </div>
    </div>
  );
}

export default CartCard;
