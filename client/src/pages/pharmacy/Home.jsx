import { Box, Button, Divider, Stack } from "@mui/material";
import React, { useEffect } from "react";
import ActionButtons from "../../components/pharmacy/ActionButtons";
import NavigationBox from "../../components/common/NavigationBox";
import HomeHeader from "../../components/pharmacy/HomeHeader";
import StoreDetail from "../../components/pharmacy/StoreDetail";
import Header from "../../components/common/Header";
import { usePharmacy } from "../../contexts/PharmacyContext";
import { useAuth } from "../../contexts/AuthContext";
import { getAccessToken } from "../../services/localStorage";
import LoginHeader from "../../components/pharmacy/LoginHeader";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext";
import axios from "../../config/axios";
import { useContact } from "../../contexts/ContactContext";

function Home() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { fetchPharmacy, fetchOpeningTime, openTime } = usePharmacy();
  const { setPharmacy, pharmacy } = usePharmacy();
  const { getProducts, products } = useProduct();
  const {getContacts, contactList} = useContact()

  useEffect(() => {
    const fetchMe = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const response = await axios.get("/users/me");
          setUser(response.data.user);
          fetchPharmacy();
          fetchOpeningTime()
          getContacts()
          getProducts();
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMe();
  }, [contactList.length, products.lenth]);

  if (!pharmacy) {
    return (
      <>
        <LoginHeader />
        <Button
          variant="contained"
          onClick={() => navigate("/pharmacy/login")}
          fullWidth
        >
          Login For Pharmacy
        </Button>
      </>
    );
  }
  return (
    <Stack direction="column" justifyContent="space-between" sx={{height: '100vh', minHeight: '740px'}}>
      <Header
        toProfile="/pharmacy/setting"
        path="/pharmacy"
        setUser={setPharmacy}
      />
      <HomeHeader {...pharmacy} />
      <StoreDetail openTime={openTime} isOpen={pharmacy.isOpen}/>
      <Divider sx={{ my: 1 }} />
      <Box flex="1">
        <ActionButtons />
      </Box>
      <NavigationBox
        toHome="/pharmacy"
        toChat="/pharmacy/contacts"
        toSetting="/pharmacy/setting"
      />
    </Stack>
  );
}

export default Home;
