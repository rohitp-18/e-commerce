import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertProvider(props) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");

  const sendAlert = (sendMessage, type) => {
    setMessage(sendMessage);
    setSeverity(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ sendAlert }}>
      {props.children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}
