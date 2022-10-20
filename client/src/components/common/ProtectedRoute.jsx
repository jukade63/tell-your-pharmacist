import { Navigate, Outlet} from "react-router-dom";


const ProtectedRoute = ({ user, redirectPath, children }) => {
  console.log('user',user);
  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
