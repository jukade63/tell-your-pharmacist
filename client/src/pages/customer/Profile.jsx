import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PinDropIcon from "@mui/icons-material/PinDrop";
import TaskIcon from "@mui/icons-material/Task";
import LogoutIcon from "@mui/icons-material/Logout";
import NavigationBox from "../../components/common/NavigationBox";
import PageTitle from "../../components/common/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BasicModal from "../../components/common/BasicModal";
import { useCustomer } from "../../contexts/CustomerContext";

function Profile() {
  const {
    customer: { profilePic, firstName, lastName },
    fetchCustomer,
  } = useCustomer();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <>
      <PageTitle toPage="/" title="การตั้งค่า" />
      <Paper
        elevation={1}
        sx={{
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          {profilePic ? (
            <Avatar sx={{ width: 75, height: 75 }} src={profilePic}></Avatar>
          ) : (
            <Avatar sx={{ width: 75, height: 75 }}></Avatar>
          )}
        </IconButton>
        <Typography variant="subtitle1">
          {firstName} {lastName}
        </Typography>
      </Paper>
      <BasicModal
        open={open}
        profilePic={profilePic}
        setOpen={setOpen}
        endpoint="customers"
        fetchUser={fetchCustomer}
      />
      <List>
        <ListItemButton onClick={() => navigate("/edit")}>
          <ListItemIcon>
            <BorderColorIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle2">ข้อมูลส่วนตัว</Typography>
          </ListItemText>
        </ListItemButton>
        <Divider />
        <Link to="/orders" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle2">สถานะออเดอร์</Typography>
            </ListItemText>
          </ListItemButton>
        </Link>
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <SafetyCheckIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle2">เปลี่ยนรหัสผ่าน</Typography>
          </ListItemText>
        </ListItemButton>
        {/* <ListItemButton>
          <ListItemIcon>
            <PinDropIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle2">ที่อยู่</Typography>
          </ListItemText>
        </ListItemButton>
        <Divider /> */}
       
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle2">ออกจากระบบ</Typography>
          </ListItemText>
        </ListItemButton>
        <Divider />
      </List>
    </>
  );
}

export default Profile;
