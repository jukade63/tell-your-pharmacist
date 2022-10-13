import { Navigate, Outlet} from "react-router-dom";
// import { getAccessToken } from "../../services/localStorage";


const ProtectedRoute = ({ user, redirectPath, children }) => {
  console.log('user',user);
  // const token= getAccessToken()
  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
