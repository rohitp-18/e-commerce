import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "./sellerNavbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import { clearErrors } from "../../redux/actions/orderAction";
import {
  deleteSellerAdvertAction,
  getSellerAdvertAction,
} from "../../redux/actions/advertiseAction";
import { SELLER_DELETE_ADVERT_RESET } from "../../redux/constants/advertiseConstants";

function SellerAdvertises() {
  const { loading, advertisements, error, isDeleted } = useSelector(
    (state) => state.sellerAdvert
  );
  const dispatch = useDispatch();
  const [row, setRow] = useState([]);
  const deleteProduct = (id) => {
    dispatch(deleteSellerAdvertAction(id));
  };
  const { sendAlert } = useContext(AlertContext);

  const column = [
    { field: "id", headerName: "Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "category", headerName: "Category", minWidth: 100, flex: 0.3 },
    {
      field: "initialDate",
      headerName: "Initial Date",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "expireDate",
      headerName: "Expire Date",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      minWidth: 80,
      flex: 0.3,
      renderCell: (params) => (
        <>
          <Button>
            <Link to={`/seller/ads/${params.id}`}>
              <Edit />
            </Link>
          </Button>
          <Button onClick={() => deleteProduct(params.id)}>
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log("first");
    dispatch(getSellerAdvertAction());
  }, [dispatch]);

  useEffect(() => {
    console.log("first");
    if (isDeleted) {
      sendAlert("Product deleted successfully", "success");
      dispatch({ type: SELLER_DELETE_ADVERT_RESET });
      dispatch(getSellerAdvertAction());
    }

    if (error) {
      sendAlert(error, "error");
      dispatch(clearErrors());
    }
    // eslint-disable-next-line
  }, [dispatch, isDeleted, error]);

  useEffect(() => {
    console.log("first");
    let law = [];
    advertisements &&
      advertisements.filter((product) =>
        law.push({
          ...product,
          initialDate: new Date(product.initialDate).toDateString(),
          expireDate: new Date(product.expireDate).toDateString(),
          id: product._id,
          name: product.name,
        })
      );

    setRow(law);
  }, [advertisements]);
  return (
    <>
      <div className="admin">
        <Slider />
        <MetaData title="All Products - Admin" />
        {loading ? (
          <Loader />
        ) : (
          <>
            {advertisements && (
              <section className="admin-products">
                <p>ALL Advertisement</p>
                <DataGrid
                  columns={column}
                  rows={row}
                  className="data-grid"
                  disableRowSelectionOnClick
                />
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SellerAdvertises;
