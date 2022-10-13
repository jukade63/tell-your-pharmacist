import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePharmacy } from "../../contexts/PharmacyContext";
import StoreCard from "../customer/StoreCard";

function PharmacyList() {
  const { pharmacies } = usePharmacy();

  return (
    <></>
  );
}

export default PharmacyList;
