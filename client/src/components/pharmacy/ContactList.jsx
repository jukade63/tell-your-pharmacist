import { Stack, Typography } from "@mui/material";
import { useContact } from "../../contexts/ContactContext";
import BasicMenu from "../common/BasicMenu";

function ContactList({ setSelectedContact }) {
  const { contactList } = useContact();
  const mappedContacts = contactList.map((contact) => {
    return {
      contactId: contact.Customer.id,
      contactName: `${contact.Customer.firstName} ${contact.Customer.lastName}`,
      contactAddress: contact.Customer.address
    };
  });

  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Typography variant='subtitle2'>Select customer</Typography>
      <BasicMenu
        contacts={mappedContacts}
        setSelectedContact={setSelectedContact}
      />
    </Stack>
  );
}

export default ContactList;
