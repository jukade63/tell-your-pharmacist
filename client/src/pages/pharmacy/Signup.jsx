import { Alert, Box, Button, Typography } from "@mui/material";
import Input from "../../components/common/Input";
import { AuthContext } from "../../contexts/AuthContext";
import PageTitle from "../../components/common/PageTitle";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { validate } from "../../helpers/validations/pharmacyValidation";
import { reverseGeocode } from "../../services/reverseGeocode";

function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    storeName: "",
    password: "",
    confirmPassword: "",
  };

  const [getLatLng, setGetLatLng] = useState({ latitude: "", longitude: "" });
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [addressValue, setAddressValue] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(validate({ ...formValues, ...getLatLng }));
      setIsSubmit(true);
      setSubmitError('')
      await signup("pharmacyAuth", { ...formValues, ...getLatLng });
      navigate("/pharmacy/login");
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

  const handleGetLocation = () => {
    const showPosition = ({ coords }) => {
      setGetLatLng({ latitude: coords.latitude, longitude: coords.longitude });
      reverseGeocode(getLatLng.latitude, getLatLng.longitude, setAddressValue);
      console.log(addressValue);
    };

    const showError = (error) => {
      if (error.message === "User denied Geolocation") {
        alert("Allow app to access your location");
        location.reload();
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, [addressValue]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleSubmit()
    }
  }, [submitError]);

  return (
    <div>
      <PageTitle title="Register" toPage="/pharmacy/login" />
      {submitError && <Alert severity="error">{submitError}</Alert>}
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
          label="Store name"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.storeName}
            </Typography>
          }
          name="storeName"
          onChange={handleChange}
          value={formValues.storeName}
        />
        <Input
          label="Adrress"
          helperText={
            <Typography color="error" variant="body2">
              {formErrors.latitude}
            </Typography>
          }
          value={addressValue}
          onClick={handleGetLocation}
        />
        <Input
          label="Password"
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
