import React, { useContext, useEffect, useState } from "react";
import "./orders.scss";
import Slider from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderAction,
  getAdminOrders,
} from "../../redux/actions/orderAction";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";

function Orders() {
  const { loading, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.updateOrder);
  const { sendAlert } = useContext(AlertContext);
  const dispatch = useDispatch();
  const [row, setRow] = useState([]);
  const navigate = useNavigate();
  const deleteProduct = (id) => {
    dispatch(deleteOrderAction(id));
  };

  const column = [
    { field: "id", headerName: "Order Id", minWidth: 200, flex: 0.5 },
    { field: "status", headerName: "Status", minWidth: 200, flex: 1 },
    { field: "qty", headerName: "Items Qty", minWidth: 100, flex: 0.3 },
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 0.3 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      minWidth: 80,
      flex: 0.3,
      renderCell: (params) => (
        <>
          <Button onClick={() => navigate(`/admin/orders/${params.id}`)}>
            <Edit />
          </Button>
          <Button onClick={() => deleteProduct(params.id)}>
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (isDeleted) {
      sendAlert("Order is Deleted successfully", "success");
      dispatch({ type: DELETE_ORDER_RESET });
      dispatch(getAdminOrders());
    }
    dispatch(getAdminOrders());
  }, [isDeleted, dispatch]);

  useEffect(() => {
    let law = [];
    orders &&
      orders.filter((product) =>
        law.push({
          id: product._id,
          status: product.orderStatus,
          qty: product.orderItems.length,
          amount: product.totalPrice,
        })
      );

    setRow(law);
  }, [dispatch, orders]);
  return (
    <>
      <MetaData title="All Orders - Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin">
          <Slider />
          {orders && (
            <section className="admin-orders">
              <p>ALL ORDERS</p>
              <DataGrid
                columns={column}
                rows={row}
                className="data-grid"
                disableRowSelectionOnClick
              />
            </section>
          )}
        </div>
      )}
    </>
  );
}

export default Orders;
