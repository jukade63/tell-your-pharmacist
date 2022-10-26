import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import * as React from "react";
import { Link } from "react-router-dom";
import { useContact } from "../../contexts/ContactContext";

export default function NavigationBox({ toHome, toChat, toSetting }) {

  const {incomingMsg, setIncomingMsg} = useContact()


  console.log(incomingMsg);
  
  const renderedBadge = incomingMsg ? (
    <Badge color='success' overlap="circular" variant="dot">
      <IconButton onClick={()=>setIncomingMsg(false)}>
        <SmsOutlinedIcon sx={{ color: "secondary.main" }} />
      </IconButton>
    </Badge>
  ) : (
    <IconButton>
      <SmsOutlinedIcon sx={{ color: "secondary.main" }} />
    </IconButton>
  );
  return (
    <Paper
      sx={{
        p: "2px 4px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        maxWidth: '575px'
      }}
    >
      <BottomNavigation
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to={toHome}>
          <BottomNavigationAction
            icon={<HomeOutlinedIcon sx={{ color: "secondary.main" }} />}
          />
        </Link>
        <Link to={toChat}>
          {renderedBadge}
        </Link>
        <Link to={toSetting}>
          <BottomNavigationAction
            icon={<SettingsOutlinedIcon sx={{ color: "secondary.main" }} />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}
