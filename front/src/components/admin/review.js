import React, { useContext, useEffect, useState } from "react";
import "./review.scss";
import Slider from "./Slider";
import { Delete, Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  deleteReviewAction,
  getAllReviewAction,
} from "../../redux/actions/productActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import {
  CLEAR_ERRORS,
  DELETE_REVIEW_RESET,
} from "../../redux/constants/productConstants";
import { set } from "mongoose";

function Review() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [row, setRow] = useState([]);
  const dispatch = useDispatch();
  const { reviews, loading, isDeleted, error } = useSelector(
    (state) => state.updateReview
  );
  const { sendAlert } = useContext(AlertContext);

  const deleteProduct = (revId) => {
    dispatch(deleteReviewAction(search, revId));
  };

  const column = [
    { field: "id", headerName: "Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.3 },
    { field: "rating", headerName: "Rating", minWidth: 100, flex: 0.3 },
    { field: "comment", headerName: "Comment", minWidth: 100, flex: 0.7 },
    {
      field: "action",
      type: "actions",
      sortable: false,
      minWidth: 80,
      flex: 0.2,
      renderCell: (params) => [
        <GridActionsCellItem
          icon={<Delete sx={{ fontSize: "20px" }} />}
          label="Delete"
          onClick={() => deleteProduct(params.id)}
        />,
      ],
    },
  ];

  const submitHandler = () => {
    if (search.length < 8) {
      return;
    }
    dispatch(getAllReviewAction(search));
    setShow(true);
  };

  const keyChange = (e) => {
    e.preventDefault();
    if (e.key === "Enter") submitHandler();
  };

  useEffect(() => {
    let law = [];
    if (reviews) {
      reviews.filter((review) =>
        law.push({
          id: review._id,
          name: review.name,
          rating: review.rating,
          comment: review.comment,
        })
      );
    }

    setRow(law);
  }, [reviews]);

  useEffect(() => {
    if (isDeleted) {
      sendAlert("Review is deleted successfully", "success");
      dispatch({ type: DELETE_REVIEW_RESET });
      dispatch(getAllReviewAction(search));
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, isDeleted, error]);
  return (
    <>
      <MetaData title="Product Review - Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin">
          <Slider />
          <section className="admin-review">
            <h3>ALL REVIEWS</h3>
            <Box className="box">
              <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                name="Name"
                sx={{ width: "30ch", mr: "10px" }}
                value={search}
                variant="standard"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => keyChange(e)}
              />
              <Button
                onClick={() => submitHandler()}
                size="small"
                variant="outlined"
              >
                Search
              </Button>
            </Box>
            {show && (
              <div className="admin-review-data">
                <DataGrid
                  columns={column}
                  rows={row}
                  className="data-grid"
                  disableRowSelectionOnClick
                  // initialState={{
                  //   pagination: {
                  //     paginationModel: {
                  //       pageSize: 5,
                  //     },
                  //   },
                  // }}
                />
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default Review;
