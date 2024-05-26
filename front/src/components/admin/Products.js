import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./products.scss";
import Slider from "./Slider";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  deleteProductAction,
  getAdminProducts,
} from "../../redux/actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import { clearErrors } from "../../redux/actions/orderAction";

function Products() {
  const { loading, adminProduct } = useSelector((state) => state.allProducts);
  const { isDeleted, error } = useSelector((state) => state.updateProduct);
  const dispatch = useDispatch();
  const [row, setRow] = useState([]);
  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
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
            <Link to={`/admin/products/${params.id}`}>
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
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      sendAlert("Product deleted successfully", "success");
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAdminProducts());
    }

    if (error) {
      sendAlert(error, "error");
      dispatch(clearErrors());
    }
  }, [dispatch, isDeleted, error]);

  useEffect(() => {
    let law = [];
    adminProduct &&
      adminProduct.filter((product) =>
        law.push({
          id: product._id,
          stock: product.stock,
          price: product.price,
          name: product.name,
        })
      );

    setRow(law);
  }, [adminProduct]);
  return (
    <>
      <MetaData title="All Products - Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin">
          <Slider />
          {adminProduct && (
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
        </div>
      )}
    </>
  );
}

export default Products;
