import { Box } from "@mui/material";
import React from "react";
import NavigationBox from "../../components/common/NavigationBox";
import Orders from "../../components/common/Orders";

function PharmacyOrderSummary() {
  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Orders path="/pharmacy" />
      </Box>
      <NavigationBox
        toHome="/pharmacy"
        toChat="/pharmacy/contacts"
        toSetting="pharmacy"
      />
    </>
  );
}

export default PharmacyOrderSummary;
