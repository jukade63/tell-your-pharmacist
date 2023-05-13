import ImageSlider from "../../components/customer/ImageSlider";
import LoginForm from "../../components/common/LoginForm";
import { getAccessToken } from "../../services/localStorage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const {loading, setLoading} = useAuth()

  useEffect(() => {
    const token = getAccessToken();
    token && navigate("/");
  }, []);

  console.log(loading);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ImageSlider />
          <LoginForm
            endpoint="customerAuth"
            toHome="/"
            toSignup="/new"
            setLoading={setLoading}
          />
        </>
      )}
    </>
  );
}

export default Login;
