import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/common/LoginForm";
import LoginHeader from "../../components/pharmacy/LoginHeader";
import { useAuth } from "../../contexts/AuthContext";
import { getAccessToken } from "../../services/localStorage";

function Login() {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const {loading} = useAuth()

  useEffect(() => {
    const token = getAccessToken();
    token && navigate("/pharmacy");
  }, []);

  return (
    <div>
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
          <LoginHeader />
          <LoginForm
            endpoint="pharmacyAuth"
            toHome="/pharmacy"
            toSignup="/pharmacy/new"
          />
        </>
      )}
    </div>
  );
}

export default Login;
