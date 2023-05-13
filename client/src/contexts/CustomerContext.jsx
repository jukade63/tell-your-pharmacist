import { useContext, useState } from "react";
import { createContext } from "react";
import axios from "../config/axios";

const CustomerContext = createContext();

function CustomerContextProvider({ children }) {
  const [customer, setCustomer] = useState(null);

  const fetchCustomer = async () => {
    const res = await axios.get("/customers");
    setCustomer(res.data.customer);
  };

  const updateAddress = async (address)=>{
    await axios.patch('/customers/address/update', address)
  }


  return (
    <CustomerContext.Provider
      value={{customer, setCustomer, fetchCustomer, updateAddress}}
    >
      {children}
    </CustomerContext.Provider>
  );
}

const useCustomer = () => {
  const context = useContext(CustomerContext);
  return context;
};
export default CustomerContextProvider;

export { CustomerContext, useCustomer };
