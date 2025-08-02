import {
  LockOpenOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../layout/alertProvider";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import {
  forgotPasswordChange,
  forgotPasswordId,
} from "../../redux/actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD_ID_RESET,
} from "../../redux/constants/userConstants";
import "./resetPassword.scss";

function ResetPassword() {
  const [pass, setPass] = useState("password");
  const [password, setPassword] = useState();
  const [confPass, setConfPass] = useState(true);
  const [confPassword, setConfPassword] = useState();

  const dispatch = useDispatch();
  const { isUpdate, updateId, error, idError, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const { sendAlert } = useContext(AlertContext);

  const changePassword = (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      sendAlert("Password and Confirm Password does not match", "error");
      return;
    }

    dispatch(forgotPasswordChange(password, id));
  };

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }

    if (idError) {
      sendAlert(idError, "error");
      dispatch({ type: FORGOT_PASSWORD_ID_RESET });
      navigate("/");
    }

    if (isUpdate) {
      sendAlert(message, "success");
      dispatch({ type: FORGOT_PASSWORD_ID_RESET });
      navigate("/");
    }

    dispatch(forgotPasswordId(id));
  }, [id, dispatch, navigate, idError, error, updateId, isUpdate]);
  return (
    <>
      {updateId ? (
        <Loader />
      ) : (
        <section className="reset-password">
          <form onSubmit={(e) => changePassword(e)}>
            <h2>Reset Password</h2>
            <Box
              sx={{ width: "30ch", display: "flex", alignItems: "flex-end" }}
            >
              <LockOpenOutlined
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <Input
                required
                type={pass ? "password" : "text"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <IconButton
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setPass(!pass)}
                  >
                    {pass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />
            </Box>

            <Box
              sx={{ width: "30ch", display: "flex", alignItems: "flex-end" }}
            >
              <LockOutlined sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <Input
                required
                type={confPass ? "password" : "text"}
                value={confPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfPassword(e.target.value)}
                endAdornment={
                  <IconButton
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setConfPass(!confPass)}
                  >
                    {confPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />
            </Box>

            <button
              disabled={loading}
              sx={{ width: "30ch" }}
              variant="contained"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default ResetPassword;
