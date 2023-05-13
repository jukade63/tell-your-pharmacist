import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useContact } from "../../contexts/ContactContext";

export default function NavigationBox({ toHome, toChat, toSetting }) {
  const { incomingMsg, setIncomingMsg } = useContact();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const renderedBadge = incomingMsg ? (
    <Badge color="success" overlap="circular" variant="dot">
      <BottomNavigationAction
        label="Chat"
        onClick={() => {
          setValue(1);
          navigate(toChat);
          setIncomingMsg(false);
        }}
        icon={<SmsOutlinedIcon sx={{ color: "secondary.main" }} />}
      />
    </Badge>
  ) : (
    <BottomNavigationAction
      label="Chat"
      onClick={() => {
        setValue(1);
        navigate(toChat);
        setIncomingMsg(false);
      }}
      icon={<SmsOutlinedIcon sx={{ color: "secondary.main" }} />}
    />
  );
  return (
    <Paper
      sx={{
        p: "2px 4px",
        position: "fixed",
        bottom: 0,
        width: "95%",
        minWidth: 340,
        maxWidth: 575,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlinedIcon sx={{ color: "secondary.main" }} />}
          onClick={() => {
            setValue(0);
            navigate(toHome);
          }}
        />
        <BottomNavigationAction
          label="Chat"
          onClick={() => {
            console.log(value);
            setValue(1)
            navigate(toChat);
            setIncomingMsg(false);
          }}
          icon={<SmsOutlinedIcon sx={{ color: "secondary.main" }} />}
        />
        <BottomNavigationAction
          label="Setting"
          icon={<SettingsOutlinedIcon sx={{ color: "secondary.main" }} />}
          onClick={() => {
            console.log(value);
            setValue(2);
            navigate(toSetting);
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
