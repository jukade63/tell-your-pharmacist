import { Avatar, Badge, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useContact } from "../../contexts/ContactContext";

function ChatHeader() {
  const { user } = useAuth();
  const { chat, getOneContact } = useContact();
  const [currentContact, setCurrentContact] = useState('');

  const contactId =
    chat.pharmacyId === user.id ? chat.customerId : chat.pharmacyId;

  const fetchCurrentContact = async () => {
    const res = await getOneContact(contactId);
    setCurrentContact(res.data.contact);
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
        position: "sticky",
        top: 0,
        borderRadius: 10,
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
      <Typography color="#eee" variant='subtitle1'>
        {receiver?.storeName || `${receiver?.firstName} ${receiver?.lastName}`} 
      </Typography>
    </Paper>
  );
}

export default ChatHeader;