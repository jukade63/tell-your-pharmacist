import { Alert, Box, Button, Typography } from "@mui/material";
import Input from "../../components/common/Input";
import PageTitle from "../../components/common/PageTitle";
import { validate } from "../../helpers/validations/customerValidation";
import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setSubmitError("");
      setIsSubmit(true);
      await signup("customerAuth", formValues);
      navigate("/login");
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      if (errMsg === "User already registered") {
        setSubmitError(errMsg);
        setTimeout(() => {
          setSubmitError("");
        }, 3000);
      } else return;
    }
  };

  console.log(submitError);
  useEffect(() => {
    console.log(formErrors);
    if (
      Object.keys(formErrors).length === 0 &&
      submitError === "" &&
      isSubmit
    ) {
      handleSubmit();
    }
  }, [submitError]);

  return (
    <div>
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <PageTitle title="Register" toPage="/login" />
      <Box
        component="form"
        autoComplete="off"
        mt="10px"
        mx="auto"
        maxWidth={600}
        onSubmit={handleSubmit}
      >
        <Input
          label="Firstname"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.firstName}
            </Typography>
          }
          name="firstName"
          onChange={handleChange}
          value={formValues.firstName}
        />
        <Input
          label="Lastname"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.lastName}
            </Typography>
          }
          name="lastName"
          onChange={handleChange}
          value={formValues.lastName}
        />
        <Input
          label="Phone number"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.phoneNumber}
            </Typography>
          }
          name="phoneNumber"
          onChange={handleChange}
          value={formValues.phoneNumber}
        />
        <Input
          label="Email"
          type="email"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.email}
            </Typography>
          }
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />
        <Input
          label="password"
          type="password"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.password}
            </Typography>
          }
          name="password"
          onChange={handleChange}
          value={formValues.password}
        />
        <Input
          label="Confirm password"
          type="password"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.confirmPassword}
            </Typography>
          }
          name="confirmPassword"
          onChange={handleChange}
          value={formValues.confirmPassword}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          color="secondary"
          sx={{ display: "block", m: "15px auto 0 auto" }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Signup;
