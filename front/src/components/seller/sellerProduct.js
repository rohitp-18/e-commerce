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
import { SELLER_DELETE_PRODUCT_RESET } from "../../redux/constants/sellerConstant";
import {
  deleteSellerProductAction,
  getSellerProductAction,
} from "../../redux/actions/sellerAction";

function SellerProducts() {
  const { loading, products } = useSelector((state) => state.sellerProduct);
  const { isDeleted, error } = useSelector((state) => state.updateProduct);
  const dispatch = useDispatch();
  const [row, setRow] = useState([]);
  const deleteProduct = (id) => {
    dispatch(deleteSellerProductAction(id));
  };
  const { sendAlert } = useContext(AlertContext);

  const column = [
    { field: "id", headerName: "Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.3 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.3 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      minWidth: 80,
      flex: 0.3,
      renderCell: (params) => (
        <>
          <Button>
            <Link to={`/seller/products/${params.id}`}>
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
    dispatch(getSellerProductAction());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      sendAlert("Product deleted successfully", "success");
      dispatch({ type: SELLER_DELETE_PRODUCT_RESET });
      dispatch(getSellerProductAction());
    }

    if (error) {
      sendAlert(error, "error");
      dispatch(clearErrors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isDeleted, error]);

  useEffect(() => {
    let law = [];
    products &&
      products.filter((product) =>
        law.push({
          id: product._id,
          stock: product.stock,
          price: product.price,
          name: product.name,
        })
      );

    setRow(law);
  }, [products]);
  return (
    <>
      <div className="admin">
        <Slider />
        <MetaData title="All Products - Admin" />
        {loading ? (
          <Loader />
        ) : (
          <>
            {products && (
              <section className="admin-products">
                <p>ALL PRODUCTS</p>
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

export default SellerProducts;
