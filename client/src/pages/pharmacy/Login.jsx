import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/common/LoginForm";
import LoginHeader from "../../components/pharmacy/LoginHeader";
import { getAccessToken } from "../../services/localStorage";

function Login() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = getAccessToken();
    token && navigate("/pharmacy");
  }, []);

  return (
    <div>
      <LoginHeader />
      <LoginForm
        endpoint="pharmacyAuth"
        toHome="/pharmacy"
        toSignup="/pharmacy/new"
      />
    </div>
  );
}

export default Login;
