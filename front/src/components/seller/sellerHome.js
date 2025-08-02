import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "./sellerNavbar";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import {
  getSellerProductAction,
  sellerOrderAction,
} from "../../redux/actions/sellerAction";

function SellerHome() {
  const { loading, products } = useSelector((state) => state.sellerProduct);
  const { orders } = useSelector((state) => state.sellerOrder);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [outOfStock, setOutOfStock] = useState([]);

  useEffect(() => {
    dispatch(sellerOrderAction());
    dispatch(getSellerProductAction());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setOutOfStock(orders.filter((order) => order.stock > 1));
      const temp = orders.filter((order) => order.orderStatus !== "cancled");
      if (temp.length > 0) {
        setAmount(temp.reduce((acc, order) => order.totalPrice + acc, 0));
      } else setAmount(0);
    }
  }, [orders]);
  return (
    <>
      <div className="admin">
        <Slider />
        <MetaData title="DashBoard" />
        {loading ? (
          <Loader />
        ) : (
          <>
            {orders && products && (
              <section className="admin-home">
                <h2>Dashboard</h2>
                <div className="total-amount">
                  <h5>Total Amount</h5>
                  <span>₹{amount}</span>
                </div>
                <div className="circles">
                  <Link to={"/admin/products"}>
                    <span>Products</span>
                    <span>{products.length}</span>
                  </Link>
                  <Link to={"/admin/orders"}>
                    <span>Orders</span>
                    <span>{orders.length}</span>
                  </Link>
                </div>
                <div className="canva-div">
                  <Line
                    style={{ minHeight: "300px" }}
                    data={{
                      labels: ["Initial Amount", "Total Amount"],
                      datasets: [
                        {
                          label: "Total Amount",
                          backgroundColor: ["red"],
                          data: [0, amount],
                        },
                      ],
                    }}
                  />
                  <div className="canvas">
                    <Doughnut
                      style={{ width: "100%", height: "100%" }}
                      data={{
                        labels: ["Out Of Stock", "In Stock"],
                        datasets: [
                          {
                            backgroundColor: ["#ff0", "#f0f"],
                            data: [
                              outOfStock.length,
                              products.length - outOfStock.length,
                            ],
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SellerHome;
