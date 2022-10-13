import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
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

  console.log("mappedContact", mappedContacts);

  return (
    <div>
      <Typography>เลือกลูกค้า</Typography>
      <BasicMenu
        contacts={mappedContacts}
        title="เลือกลูกค้า"
        setSelectedContact={setSelectedContact}
      />
    </div>
  );
}

export default ContactList;
