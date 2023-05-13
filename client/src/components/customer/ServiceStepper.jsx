import { Step, Stepper, StepLabel, Typography, Box } from "@mui/material";

function ServiceStepper({ logedIn }) {
  return (
    <Box sx={{ margin: "10px 0 10px 5px" }}>
      <Typography variant="h3" color="#102e75" ml={2}>
        How to use
      </Typography>
      <Stepper
        orientation="vertical"
        activeStep={`${logedIn ? 1 : 0}`}
        sx={{ width: "300px", mx: "auto" }}
      >
        <Step>
          <StepLabel>Register, Sign in</StepLabel>
        </Step>
        <Step>
          <StepLabel>Select a store</StepLabel>
        </Step>
        <Step>
          <StepLabel>Chat to pharmacist</StepLabel>
        </Step>
        <Step>
          <StepLabel>Drug dispensing, payment</StepLabel>
        </Step>
        <Step>
          <StepLabel>Receive drugs (delivery or self pick)</StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
}

export default ServiceStepper;
