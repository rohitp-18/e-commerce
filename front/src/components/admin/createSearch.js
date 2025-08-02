import React, { useContext, useEffect, useState } from "react";
import "./createProduct.scss";
import Slider from "./Slider";
import { Box, Button, TextField } from "@mui/material";
import { Spellcheck } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../layout/alertProvider";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_CREATE_SEARCH_RESET,
  CLEAR_ERRORS,
} from "../../redux/constants/searchConstants";
import { adminCreateSearch } from "../../redux/actions/searchAction";

function CreateSearch() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { loading, isCreated, error } = useSelector((state) => state.search);
  const navigator = useNavigate();
  const { sendAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isCreated) {
      sendAlert("Search created successfully", "success");
      navigator("/admin/search");
      dispatch({ type: ADMIN_CREATE_SEARCH_RESET });
    }
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [error, dispatch, sendAlert, isCreated, navigator]);

  return (
    <div className="admin">
      <Slider />
      <section className="create-products">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(adminCreateSearch({ query }));
          }}
        >
          <h3>Create Search</h3>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Spellcheck sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              required
              name="query"
              sx={{ width: "30ch" }}
              value={query}
              label="Query"
              variant="standard"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
          <Button disabled={loading} type="submit">
            Create
          </Button>
        </form>
      </section>
    </div>
  );
}

export default CreateSearch;
