import { Avatar, Badge, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useContact } from "../../contexts/ContactContext";

function ChatHeader() {
  const { user } = useAuth();
  const { chat, getOneContact } = useContact();
  const [currentContact, setCurrentContact] = useState('');

  console.log(chat);

  const contactId =
    chat.pharmacyId === user.id ? chat.customerId : chat.pharmacyId;

  const fetchCurrentContact = async () => {
    const res = await getOneContact(contactId);
    setCurrentContact(res.data.contact);
    console.log("curr contact", res.data.contact);
  };

  useEffect(() => {
    fetchCurrentContact();
  }, []);

  let receiver;
  if (currentContact) {
    receiver = user.id === currentContact.pharmacyId
      ? currentContact.Customer
      : currentContact.Pharmacy;
  }

  return (
    <Paper
      sx={{
        backgroundImage: "linear-gradient(to bottom right, #DB4FCB, #2E2AD6)",
        p: 1,
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: "345px",
        zIndex: 20,
      }}
    >
      <Badge
        color="success"
        overlap="circular"
        variant="dot"
        sx={{ mr: 1 }}
      >
        <Avatar src={receiver?.profilePic} />
      </Badge>
      <Typography color="#eee">
        {receiver?.storeName || receiver?.firstName}
      </Typography>
    </Paper>
  );
}

export default ChatHeader;
