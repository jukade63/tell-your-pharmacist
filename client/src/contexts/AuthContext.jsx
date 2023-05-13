import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../services/localStorage";
import { useCustomer } from "./CustomerContext";
import { usePharmacy } from "./PharmacyContext";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const { setCustomer } = useCustomer();
  const { setPharmacy } = usePharmacy();
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const signup = async (endpoint, input) => { 
    const response = await axios.post(`/${endpoint}/signup`, input);
    // console.log(response)
    setAccessToken(response.data.token);
  };

  const login = async (endpoint, phoneNumber, password) => {
    const response = await axios.post(`/${endpoint}/login`, {
      phoneNumber,
      password,
    });
    setAccessToken(response.data.token);
    
  };

  const logout = (endpoint) => {
    removeAccessToken();
    setUser(null);
    setCustomer(null);
    setPharmacy(null);
    navigate(`${endpoint}/login`);
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthContextProvider;

export { AuthContext, useAuth };
