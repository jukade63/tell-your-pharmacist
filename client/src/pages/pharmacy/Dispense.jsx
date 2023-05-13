import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import OrderList from "../../components/pharmacy/OrderList";
import OrderInput from "../../components/pharmacy/OrderInput";
import ContactList from "../../components/pharmacy/ContactList";

function Dispense() {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <>
      <PageTitle title="Drug dispensing" toPage="/pharmacy" />
      <Stack spacing={2} mt={2}>
        <ContactList setSelectedContact={setSelectedContact} />
        <Typography variant="body2">
          <strong>Address :</strong> {selectedContact?.contactAddress}
        </Typography>
        <OrderInput />
        <OrderList contactId={selectedContact?.contactId} />
      </Stack>
    </>
  );
}

export default Dispense;
