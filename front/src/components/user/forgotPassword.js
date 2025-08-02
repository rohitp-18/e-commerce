import { Box, Button, Input, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./forgotPassword.scss";
import { Check, Email } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../layout/alertProvider";
import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD_RESET,
} from "../../redux/constants/userConstants";
import { forgotPasswordRequest } from "../../redux/actions/userAction";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { sendAlert } = useContext(AlertContext);

  function submitHandler(e) {
    e.preventDefault();

    dispatch(forgotPasswordRequest(email));
  }

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }

    if (success) {
      sendAlert(message, "success");
      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [dispatch, error, success, message]);

  return (
    <section className="forgot-password">
      {!success ? (
        <form onSubmit={(e) => submitHandler(e)}>
          <h2>Forgot Password</h2>
          <Typography variant="body2">
            Enter valid Email id, then forgot password will be send on your
            email id, click on Verify button in email
          </Typography>
          <Input
            placeholder="Email Address"
            type="email"
            style={{ maxWidth: "35ch" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startAdornment={<Email />}
          />
          <button
            disabled={loading}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Send Email
          </button>
        </form>
      ) : (
        <div className="email-success">
          <Box className="check-icon">
            <Check />
          </Box>
          <h2>Email Sended to your email {email}</h2>
          <div>
            Check your email for the reset password link has been send your
            email address,
            <br /> Click on the link and reset your password
          </div>
        </div>
      )}
    </section>
  );
}

export default ForgotPassword;
