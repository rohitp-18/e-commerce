import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import "./checkoutSteps.scss";

function CheckoutSteps({ step }) {
  const steps = [
    { label: "Shipping", icon: <LocalShipping /> },
    { label: "Confirm Order", icon: <LibraryAddCheck /> },
    { label: "Payment", icon: <AccountBalance /> },
  ];
  return (
    <section className="checkout-steps">
      <Stepper>
        {steps.map((i, index) => (
          <Step key={index} completed={step > index} active={step === index}>
            <StepLabel
              className="label"
              icon={i.icon}
              style={{ color: step >= index && "tomato" }}
            >
              <Typography>{i.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </section>
  );
}

export default CheckoutSteps;
