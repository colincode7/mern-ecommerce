import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

////////////////////////////////////    CUSTOM STYLE COMPONENTS   /////////////////////////////////////////
import { CheckoutStepConnector } from "./CustomStyles/CheckoutStepper/StepConnector";
import { StepIcon } from "./CustomStyles/CheckoutStepper/StepIcon";

function getSteps() {
  return ["Sign In", "Shipping", "Payment", "Place Order"];
}

export default function CheckoutStepper({ step }) {
  const steps = getSteps();

  return (
    <div>
      <Stepper
        activeStep={step}
        alternativeLabel
        connector={<CheckoutStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
