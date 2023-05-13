import { Stack, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header({ toProfile, path }) {
  const { logout } = useAuth();
 
  const onLogout = () => {
    logout(path);
  };
  return (
    <Stack direction="row" justifyContent="space-between">
      <Link to={toProfile}>
        <IconButton>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Link>
      <IconButton onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
}

export default Header;
