import { useEffect } from "react";
import Header from "../../components/common/Header";
import NavigationBox from "../../components/common/NavigationBox";
import FindPharmacies from "../../components/customer/FindPharmacies";
import GridHero from "../../components/customer/GridHero";
import ServiceStepper from "../../components/customer/ServiceStepper";
import { useAuth } from "../../contexts/AuthContext";
import { useCustomer } from "../../contexts/CustomerContext";
import { getAccessToken } from "../../services/localStorage";
import axios from '../../config/axios'
import { useContact } from "../../contexts/ContactContext";

function Home() {
  const { setCustomer, fetchCustomer, customer } = useCustomer();
  const { setUser } = useAuth();
  const {getContacts, contactList} = useContact()

  useEffect(() => {
    const fetchMe = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const response = await axios.get("/users/me");
          setUser(response.data.user);
          fetchCustomer();
          getContacts()
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMe();
  }, [contactList.lenth]);


  return (
    <div>
      {customer && (
        <Header toProfile="/profile" path="" setUser={setCustomer} />
      )}
      <GridHero />
      <FindPharmacies />
      <ServiceStepper />
      <NavigationBox toHome="/" toChat="/contacts" toSetting="/profile" />
    </div>
  );
}

export default Home;
