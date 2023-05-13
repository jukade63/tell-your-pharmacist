import { Stack, Typography } from "@mui/material";
import ContactItem from "./ContactItem";
import { useContact } from "../../contexts/ContactContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const {contactList, setChat } = useContact();
  const { user } = useAuth();
  const navigate = useNavigate();

  const selectUser = (contact) => {
    setChat(contact);
    navigate("/chat");
  };
  return (
    <Stack direction="column" justifyContent="space-between" height="100vh">
      <Stack>
        <Typography variant="h3" my={3} color="primary">
          Recent chats
        </Typography>
        {contactList?.map((contact) => {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              selectUser={selectUser}
              user={user}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

export default Contacts;
