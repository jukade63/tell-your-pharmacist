import ImageSlider from '../../components/customer/ImageSlider'
import LoginForm from '../../components/common/LoginForm'
import { getAccessToken } from "../../services/localStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    token && navigate("/");
  }, []);
  return (
    <div>
      <ImageSlider />
      <LoginForm endpoint='customerAuth' toHome='/' toSignup='/new' />
    </div>
  )
}

export default Login
