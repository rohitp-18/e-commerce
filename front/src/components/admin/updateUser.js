import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import "./updateUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Email,
  Person,
  ShoppingCartCheckoutSharp,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { detailsUser, updateAdminUser } from "../../redux/actions/userAction";
import Loader from "../layout/Loader";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";
import { AlertContext } from "../layout/alertProvider";
import { clearErrors } from "../../redux/actions/orderAction";

function UpdateUser() {
  const dispatch = useDispatch();
  const { user, error, isUpdated, loading } = useSelector(
    (state) => state.updateUser
  );
  const { id } = useParams();
  const { sendAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateAdminUser(id, { name, email, role }));
  };

  useEffect(() => {
    dispatch(detailsUser(id));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch(clearErrors);
    }
    if (isUpdated) {
      sendAlert("User updated successfully", "success");
      dispatch({ type: UPDATE_USER_RESET });
      navigate("/admin/users");
    }
  }, [error, isUpdated]);

  useEffect(() => {
    if (user) {
      console.log(user);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  /// select role is important
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="admin">
          <Slider />
          <section className="create-products">
            <form onSubmit={(e) => submitHandler(e)}>
              <h3>Update User</h3>
              <Box
                variant="standard"
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Person sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  required
                  name="Name"
                  sx={{ width: "30ch" }}
                  value={name}
                  label="Name"
                  variant="standard"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  required
                  name="price"
                  sx={{ width: "30ch" }}
                  value={email}
                  label="Price"
                  variant="standard"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <VerifiedUser sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    label="Age"
                    value={role}
                    sx={{ width: "30ch" }}
                    required
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <button type="submit">Update</button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default UpdateUser;
