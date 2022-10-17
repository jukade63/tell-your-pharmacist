import { useContext, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

const PharmacyContext = createContext();

function PharmacyContextProvider({ children }) {
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacy, setPharmacy] = useState('');
  const [reviews, setReviews] = useState([]);
  const [openTime, setOpenTime] = useState(null)
  const navigate = useNavigate()

  const fetchPharmacy = async () => {
    const res = await axios.get("/pharmacies");
    setPharmacy(res.data.pharmacy);
  };

  const getPharmacyById = (id) => {
    return axios.get(`/pharmacies/${id}`)
  }
  
  const updateInfo = (value) => {
    return axios.put('/pharmacies', value)
  }

  const updateIsOpen = async (value)=>{
    await axios.patch('/pharmacies/isOpen/update', value)
  }

  const fetchOpeningTime = async () =>{
    const res = await axios.get('/openingTime')
    setOpenTime(res.data.openingTime)
  }
  const getOpeningTimeByPharmacy = (pharmacyId) =>{
    return axios.get(`/openingTime/${pharmacyId}`)
  }

  const updateOpeningTime = (value) => {
    return axios.put('/openingTime', value)
  }

  const addNewReview = async (value, pharmacyId) => {
    await axios.post('/reviews', value)
    navigate(`/reviews/${pharmacyId}`)
  }

  const getReviews = async (pharmacyId)=>{
    const res = await axios.get(`reviews/${pharmacyId}`)
    setReviews(res.data.reviews);

  }


  return (
    <PharmacyContext.Provider
      value={{
        pharmacies,
        setPharmacies,
        pharmacy,
        setPharmacy,
        fetchPharmacy,
        getPharmacyById,
        addNewReview,
        getReviews,
        fetchOpeningTime,
        updateInfo,
        updateOpeningTime,
        openTime,
        updateIsOpen,
        reviews,
        getOpeningTimeByPharmacy
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
}

const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  return context;
};
export default PharmacyContextProvider;

export { PharmacyContext, usePharmacy };
