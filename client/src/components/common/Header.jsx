import { Stack, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useOrder } from "../../contexts/OrderContext";

function Header({ toProfile, path }) {
  const { logout } = useAuth();
 

  const onLogout = () => {
    logout(path);
  };
  return (
    <Stack direction="row" justifyContent="space-between" mb={1}>
      <Link to={toProfile}>
        <IconButton>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Link>
      {/* <IconButton>
          <NotificationsIcon />
      </IconButton> */}
      <IconButton onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
}

export default Header;
