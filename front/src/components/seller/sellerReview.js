import React, { useContext, useEffect, useState } from "react";
import Slider from "./sellerNavbar";
import { Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { sellerReviewAction } from "../../redux/actions/productActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import { CLEAR_ERRORS } from "../../redux/constants/productConstants";

function SellerReview() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [row, setRow] = useState([]);
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.sellerReview
  );
  const { sendAlert } = useContext(AlertContext);

  const column = [
    { field: "id", headerName: "Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.3 },
    { field: "rating", headerName: "Rating", minWidth: 100, flex: 0.3 },
    { field: "comment", headerName: "Comment", minWidth: 100, flex: 0.7 },
  ];

  const submitHandler = () => {
    if (search.length < 8) {
      return;
    }
    dispatch(sellerReviewAction(search));
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
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error]);
  return (
    <>
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
          <MetaData title="Product Review - Admin" />
          {loading ? (
            <Loader />
          ) : (
            <>
              {show && (
                <div className="admin-review-data">
                  <DataGrid
                    columns={column}
                    rows={row}
                    className="data-grid"
                    slots={{ toolbar: GridToolbar }}
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
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default SellerReview;
