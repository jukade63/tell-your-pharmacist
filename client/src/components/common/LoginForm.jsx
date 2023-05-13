import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import BasicSnackbar from "./BasicSnackbar";

function LoginForm({ endpoint, toHome, toSignup}) {
  const navigate = useNavigate();
  const { login} = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login(endpoint, phoneNumber, password);
      navigate(toHome);
    } catch (error) {
      setOpen(true);
      setError(error.response.data.message);
    } 
  };

  return (
    <>
      {error && (
        <BasicSnackbar
          open={open}
          message={error}
          severity="error"
          onClose={handleClose}
        />
      )}

      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt="10px"
        mx="auto"
        maxWidth={600}
        onSubmit={handleSubmit}
      >
        <Input
          label="Phone number"
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
        <Input
          label="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Stack spacing={2} display="flex" mx="auto" mt={1} alignItems="center">
          <Button
            variant="contained"
            type="submit"
            sx={{ width: 300, textTransform: "none" }}
          >
            Sign In
          </Button>
          <Typography variant='subtitle3'>
            Don't have any account?
            <Link to={toSignup}>
              <Typography component="span" sx={{ ml: 1 }} color="primary" variant='subtitle3'>
                Register
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default LoginForm;
