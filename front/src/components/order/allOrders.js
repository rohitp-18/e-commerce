import { Launch, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrdersAction } from "../../redux/actions/orderAction";
import "./allOrders.scss";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

function AllOrders() {
  const { orders, loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [row, setRow] = useState([]);

  const column = [
    { field: "id", headerName: "Id", minWidth: 120, flex: 0.3 },
    { field: "status", headerName: "Status", minWidth: 90, flex: 0.2 },
    { field: "qty", headerName: "Item Qty", minWidth: 90, flex: 0.2 },
    { field: "amount", headerName: "Amount", minWidth: 90, flex: 0.2 },
    {
      field: "actions",
      minWidth: 50,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Launch />}
          label="Open"
          onClick={() => navigator(`/order/${params.id}`)}
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(getMyOrdersAction());
  }, [dispatch]);

  useEffect(() => {
    let law = [];
    if (orders) {
      orders.map((order) =>
        law.push({
          id: order._id,
          status: order.orderStatus,
          qty: order.orderItems.length,
          amount: order.totalPrice,
        })
      );
    }
    setRow(law);
  }, [orders]);
  return (
    <>
      <MetaData title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <section className="all-orders">
          {orders && orders.length != 0 ? (
            <>
              <h2>{user.name}'s Orders</h2>
              <DataGrid
                className="data-grid"
                columns={column}
                rows={row}
                autoHeight={true}
                onCellClick={(e) => navigator(`/orders/${e.row.id}`)}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
              />
              {/* <DataGrid columns={[{}]} */}
            </>
          ) : (
            <div className="order-empty">
              <ShoppingCartOutlined />
              <h2>Order something to Buy</h2>
              <button onClick={() => navigator("/")}>Products</button>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default AllOrders;
