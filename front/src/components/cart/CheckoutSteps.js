import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import "./checkoutSteps.scss";
import Shipping from "./shipping";
import ConfirmOrder from "./confirmOrder";
import Payment from "./payment";
import { useSelector } from "react-redux";

function CheckoutSteps({ step }) {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setcomplete] = useState(0);
  const steps = [
    { label: "Shipping", icon: <LocalShipping /> },
    { label: "Confirm Order", icon: <LibraryAddCheck /> },
    { label: "Payment", icon: <AccountBalance /> },
  ];

  const { tempItems } = useSelector((state) => state.cart);
  return (
    <section className="checkout-steps">
      <Stepper>
        {steps.map((i, index) => (
          <Step key={index} completed={activeStep > index} active={activeStep}>
            <StepLabel
              className="label"
              icon={i.icon}
              style={{ color: complete >= index && "tomato" }}
            >
              <Typography>{i.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 ? (
        <Shipping setActiveStep={setActiveStep} />
      ) : activeStep === 1 ? (
        <ConfirmOrder cartItems={tempItems} setActiveStep={setActiveStep} />
      ) : (
        <Payment />
      )}
    </section>
  );
}

export default CheckoutSteps;
