import {
  LockOpen,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./updateuser.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadRequest, updatePassword } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_ERRORS,
  UPDATE_PASSWORD_RESET,
} from "../../redux/constants/userConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";

function UpadatePassword() {
  const { error, isUpdate, loading } = useSelector((state) => state.update);
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { sendAlert } = useContext(AlertContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      sendAlert("please fill all required fields", "info");
      return;
    }
    if (confirmPassword !== password) {
      sendAlert("Password does not match with confirm password", "info");
      return;
    }
    dispatch(updatePassword(oldPassword, confirmPassword, password));
  };

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    if (isUpdate) {
      sendAlert("Password updated successfuly", "success");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      dispatch(loadRequest());
      navigator("/account");
    }
  }, [error, isUpdate, dispatch, navigator]);
  return (
    <>
      <MetaData title="Update Password" />
      {loading ? (
        <Loader />
      ) : (
        <section className="updateUser">
          <form onSubmit={(e) => submitHandler(e)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <LockOutlined sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                sx={{ width: "25ch" }}
                label="Old Password"
                variant="standard"
                type="password"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <LockOpen sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ width: "25ch" }}
                type="password"
                label="Password"
                variant="standard"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LockOpen sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl sx={{ width: "25ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm Password
                </InputLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <button className="submit" type="submit">
              Update
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default UpadatePassword;
