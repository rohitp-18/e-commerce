import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminOrders } from "../../redux/actions/orderAction";
import { getAdminProducts } from "../../redux/actions/productActions";
import { getAdminUsers } from "../../redux/actions/userAction";
import "./adminHome.scss";
import Slider from "./Slider";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";

function AdminHome() {
  const { loading, adminProduct } = useSelector((state) => state.allProducts);
  const { users } = useSelector((state) => state.allUsers);
  const { orders } = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [outOfStock, setOutOfStock] = useState([]);

  useEffect(() => {
    dispatch(getAdminOrders());
    dispatch(getAdminProducts());
    dispatch(getAdminUsers());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setOutOfStock(orders.filter((order) => order.stock > 1));
      setAmount(orders.reduce((acc, order) => order.totalPrice + acc, 0));
    }
  }, [orders]);
  return (
    <>
      <MetaData title="DashBoard" />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin">
          <Slider />
          {orders && users && adminProduct && (
            <section className="admin-home">
              <h2>Dashboard</h2>
              <div className="total-amount">
                <h5>Total Amount</h5>
                <span>₹2000</span>
              </div>
              <div className="circles">
                <Link to={"/admin/products"}>
                  <span>Products</span>
                  <span>{adminProduct.length}</span>
                </Link>
                <Link to={"/admin/orders"}>
                  <span>Orders</span>
                  <span>{orders.length}</span>
                </Link>
                <Link to={"/admin/users"}>
                  <span>Users</span>
                  <span>{users.length}</span>
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
                            adminProduct.length - outOfStock.length,
                          ],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}

export default AdminHome;
