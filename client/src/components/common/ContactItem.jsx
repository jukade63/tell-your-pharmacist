import {
  Avatar,
  Box,
  Button,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { useContact } from "../../contexts/ContactContext";

const showProfileSX = {
  "&:hover": {
    "& .profile": {
      display: "block",
      transition: "display 2s",
    },
  },
};

function ContactItem({ contact, selectUser, user }) {
  const user1 = user?.id;

  const [data, setData] = useState("");
  const { setIncomingMsg } = useContact();

  let contactName, profilePic, user2;
  if (contact.pharmacyId === user.id) {
    contactName =  `${contact.Customer.firstName} ${contact.Customer.lastName}`;
    profilePic = contact.Customer.profilePic;
    user2 = contact.customerId;
  } else if (contact.customerId === user.id) {
    contactName = contact.Pharmacy.storeName;
    profilePic = contact.Pharmacy.profilePic;
    user2 = contact.pharmacyId;
  }

  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  const handleSelectContact = async () => {
    selectUser(contact);
    setIncomingMsg(false);
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  useEffect(() => {
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  const navigate = useNavigate();

  const viewProfile = () => {
    const id = contact.customerId;
    navigate(`/pharmacy/customer-info/${id}`);
  };

  const secondaryText = data?.from !== user1 && data?.unread && data.text;

  return (
    <Stack
      sx={{
        borderBottom: "1px solid #dedcdd",
        background: 'white',
      }}
      className="parent"
    >
      {data?.from !== user1 && data?.unread && (
        <span className="child">New</span>
      )}
      <ListItemButton sx={showProfileSX} className="card">
        <ListItemAvatar onClick={handleSelectContact}>
          <Avatar alt="contact" src={profilePic} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="subtitle2">{contactName}</Typography>}
          secondary={<Typography>{secondaryText}</Typography>}
          secondaryTypographyProps={{
            style: {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "20ch",
              letterSpacing: 0.2,
            },
          }}
          sx={{}}
        />
        {user.id === contact.pharmacyId && (
          <Button
            size="small"
            variant="contained"
            sx={{ display: "none" }}
            className="profile"
            disableElevation
            onClick={viewProfile}
          >
            See profile
          </Button>
        )}
      </ListItemButton>
    </Stack>
  );
}

export default ContactItem;
