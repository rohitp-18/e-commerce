import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import "./users.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { deleteUser, getAdminUsers } from "../../redux/actions/userAction";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";

function Users() {
  const { users, loading } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext);
  const { isDeleted } = useSelector((state) => state.updateUser);
  const [row, setRow] = useState([]);

  const deleteUsers = (id) => {
    dispatch(deleteUser(id));
  };

  const column = [
    { field: "id", headerName: "Id", minWidth: 100, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 100, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "role", headerName: "Role", minWidth: 100, flex: 0.3 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      sortable: false,
      minWidth: 80,
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => navigate(`/admin/users/${params.id}`)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteUsers(params.id)}
        />,
      ],
    },
  ];

  useEffect(() => {
    if (isDeleted) {
      sendAlert("User Deleted Successfully", "success");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAdminUsers());
  }, [dispatch, isDeleted]);

  useEffect(() => {
    let law = [];
    users &&
      users.filter((user) =>
        law.push({
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        })
      );

    setRow(law);
  }, [users]);

  return (
    <>
      <MetaData title="Users - Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin">
          <Slider />
          {users && (
            <section className="admin-users">
              <p>ALL USERS</p>
              <DataGrid
                columns={column}
                rows={row}
                autoHeight={true}
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

export default Users;
