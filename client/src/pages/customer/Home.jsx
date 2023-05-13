import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import NavigationBox from "../../components/common/NavigationBox";
import FindPharmacies from "../../components/customer/FindPharmacies";
import GridHero from "../../components/customer/GridHero";
import ServiceStepper from "../../components/customer/ServiceStepper";
import { useAuth } from "../../contexts/AuthContext";
import { useCustomer } from "../../contexts/CustomerContext";
import { getAccessToken } from "../../services/localStorage";
import axios from "../../config/axios";
import { useContact } from "../../contexts/ContactContext";
import BasicHero from "../../components/common/BasicHero";
import { Box, CircularProgress } from "@mui/material";

function Home() {
  const { setCustomer, fetchCustomer, customer } = useCustomer();
  const { setUser } = useAuth();
  const { getContacts } = useContact();
  const [loading, setLoading] = useState(true);
  const token = getAccessToken();
  
  useEffect(() => {
    const fetchMe = async () => {
      if (token) {
        try {
          const response = await axios.get("/users/me");
          setUser(response.data.user);
          fetchCustomer();
          setLoading(false);
          getContacts();
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMe();
  }, []);

  return (
    <div>
      {customer && (
        <Header toProfile="/profile" path="" setUser={setCustomer} />
      )}
      {token && loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <BasicHero />
          <GridHero />
          <FindPharmacies setLoading={setLoading}/>
          <ServiceStepper logedIn={customer} />
          <NavigationBox toHome="/" toChat="/contacts" toSetting="/profile" />
        </>
      )}
    </div>
  );
}

export default Home;
