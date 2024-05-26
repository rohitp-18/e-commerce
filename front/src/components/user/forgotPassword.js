import { Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import "./forgotPassword.scss";
import { Email } from "@mui/icons-material";

function ForgotPassword() {
  const [email, setEmail] = useState();

  function submitHandler(e) {
    e.preventDefault();
  }
  return (
    <section className="forgot-password">
      <form onSubmit={(e) => submitHandler(e)}>
        <h2>Forgot Password</h2>
        <Typography variant="body2">
          Enter valid Email id, then forgot password will be send on your email
          id, click on Verify button in email
        </Typography>
        <Input
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startAdornment={<Email />}
        />
        <Button variant="standard" color="secondary" type="submit">
          Send Email
        </Button>
      </form>
    </section>
  );
}

export default ForgotPassword;
