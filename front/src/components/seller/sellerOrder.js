import React, { useContext, useEffect, useState } from "react";
import Slider from "./sellerNavbar";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import {
  deleteSellerOrderAction,
  sellerOrderAction,
} from "../../redux/actions/sellerAction";
import { SELLER_DELETE_ORDER_RESET } from "../../redux/constants/sellerConstant";

function SellerOrders() {
  const { loading, orders, isDeleted } = useSelector(
    (state) => state.sellerOrder
  );
  const { sendAlert } = useContext(AlertContext);
  const dispatch = useDispatch();
  const [row, setRow] = useState([]);
  const navigate = useNavigate();

  const deleteProduct = (id) => {
    dispatch(deleteSellerOrderAction(id));
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
          <Button onClick={() => navigate(`/seller/orders/${params.id}`)}>
            <Edit />
          </Button>
          <Button
            disabled={params.row.status === "cancled"}
            onClick={() => deleteProduct(params.id)}
          >
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (isDeleted) {
      sendAlert("Order is Cancled successfully", "success");
      dispatch({ type: SELLER_DELETE_ORDER_RESET });
      dispatch(sellerOrderAction());
    }
    dispatch(sellerOrderAction());
  }, [isDeleted, dispatch]);

  useEffect(() => {
    let law = [];
    orders &&
      orders.filter((product) =>
        law.push({
          id: product._id,
          status: product.orderStatus,
          qty: product.orderItems.quantity,
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

export default SellerOrders;
