import { useContext, useEffect, useState } from "react";
import "./review.scss";
import Slider from "./Slider";
import { Close, Delete, Edit, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";
import {
  adminDeleteSearch,
  getAdminSearch,
  updateAction,
} from "../../redux/actions/searchAction";
import {
  ADMIN_DELETE_SEARCH_RESET,
  CLEAR_ERRORS,
  UPDATE_SEARCH_RESET,
} from "../../redux/constants/searchConstants";

function AdminSearch() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    query: "",
    verified: false,
  });

  const dispatch = useDispatch();
  const { searches, loading, isDeleted, error, isUpdated } = useSelector(
    (state) => state.search,
  );
  const { sendAlert } = useContext(AlertContext);

  const deleteProduct = (revId) => {
    dispatch(adminDeleteSearch(revId));
  };

  // Open dialog and set edit data
  const handleEditClick = (params) => {
    const item = searches.find((s) => s._id === params.id);
    if (item) {
      setEditData({ id: item._id, query: item.query, verified: item.verified });
      setOpen(true);
    }
  };

  // Handler for form submit (implement your update logic here)
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateAction(editData.id, {
        query: editData.query,
        verified: editData.verified,
      }),
    );
    setOpen(false);
  };

  const column = [
    { field: "id", headerName: "Id", minWidth: 200, flex: 0.5 },
    { field: "query", headerName: "Query", minWidth: 200, flex: 0.3 },
    { field: "verified", headerName: "Verified", minWidth: 100, flex: 0.3 },
    {
      field: "action",
      type: "actions",
      headerName: "Actions",
      minWidth: 80,
      flex: 0.2,
      getActions: (params) => [
        <>
          <>
            <GridActionsCellItem
              icon={<Edit />}
              onClick={() => handleEditClick(params)}
              label="Edit"
            />
          </>
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={() => deleteProduct(params.id)}
            showInMenu={false}
          />
        </>,
      ],
    },
  ];

  const submitHandler = () => {
    if (search.length < 8) {
      return;
    }
    dispatch(getAdminSearch(search));
  };

  const keyChange = (e) => {
    e.preventDefault();
    if (e.key === "Enter") submitHandler();
  };

  useEffect(() => {
    setRow(
      searches.map((item) => ({
        id: item._id,
        query: item.query,
        verified: item.verified ? "Yes" : "No",
      })),
    );
  }, [searches]);

  useEffect(() => {
    dispatch(getAdminSearch(""));
  }, [dispatch]);

  useEffect(() => {
    console.log(searches);
  }, [searches]);

  useEffect(() => {
    if (isDeleted) {
      sendAlert("AdminSearch is deleted successfully", "success");
      dispatch({ type: ADMIN_DELETE_SEARCH_RESET });
      dispatch(getAdminSearch(search));
    }

    if (isUpdated) {
      sendAlert("Search updated successfully", "success");
      dispatch(getAdminSearch(search));
      dispatch({ type: UPDATE_SEARCH_RESET });
      setOpen(false);
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isDeleted, error]);

  return (
    <>
      <div className="admin">
        <Slider />
        <section className="admin-review">
          <h3>ALL Searches</h3>
          <Box className="box">
            <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              name="query"
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
          <MetaData title="Product Search - Admin" />
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="admin-review-data">
                <DataGrid
                  columns={column}
                  rows={row}
                  className="data-grid"
                  disableRowSelectionOnClick
                />
              </div>
            </>
          )}
        </section>
      </div>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Search Query
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <form className="min-w-64" onSubmit={handleUpdateSubmit}>
            <TextField
              label="Query"
              fullWidth
              margin="normal"
              value={editData.query}
              onChange={(e) =>
                setEditData({ ...editData, query: e.target.value })
              }
            />
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <label>Verified:</label>
              <Button
                variant={editData.verified ? "contained" : "outlined"}
                color={editData.verified ? "success" : "inherit"}
                sx={{ ml: 2 }}
                onClick={() =>
                  setEditData({ ...editData, verified: !editData.verified })
                }
              >
                {editData.verified ? "Yes" : "No"}
              </Button>
            </Box>
            <DialogActions sx={{ mt: 2 }}>
              <Button type="submit" autoFocus variant="contained">
                Save changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminSearch;
