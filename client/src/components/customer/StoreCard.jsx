import {
  Avatar,
  Badge,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { useNavigate } from "react-router-dom";

function StoreCard({
  id,
  firstName,
  lastName,
  storeName,
  isOpen,
  distance,
  profilePic,
}) {
  const navigate = useNavigate();

  const selectPharmacy = () => {
    navigate(`/stores/${id}/${distance}`);
  };

  const renderAvatar = isOpen ? (
    <Badge color="success" overlap="circular" variant="dot">
      <Avatar src={profilePic} />
    </Badge>
  ) : (
    <Avatar src={profilePic} />
  );

  return (
    <Paper onClick={selectPharmacy} sx={{ mb: 0.5 }}>
      <ListItemButton>
        <ListItemAvatar>
          {renderAvatar}
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">{storeName}</Typography>}
          secondary={`${firstName} ${lastName}`}
          secondaryTypographyProps={{ color: "primary.main" }}
        />
        <ListItemIcon
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DirectionsWalkIcon sx={{ color: "primary.main" }} />
          <Typography variant="body3">
            {(distance / 1000).toFixed(2)} km
          </Typography>
        </ListItemIcon>
      </ListItemButton>
    </Paper>
  );
}

export default StoreCard;
