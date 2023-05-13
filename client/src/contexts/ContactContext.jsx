import axios from "../config/axios";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ContactContext = createContext();

function ContactContextProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState({})
  const [contactList, setContactList] = useState([]);
  const [incomingMsg, setIncomingMsg] = useState(false);
  const navigate = useNavigate()

  const getContacts = async () => {
    const response = await axios.get("/contacts");
    const contacts = response.data.contacts;
    setContactList(contacts);
  };

  const getOneContact = (contactId) =>{
    return axios.get(`/contacts/contact/${contactId}`)
  }
 
  const addContact = async (id)=>{
      const response = await axios.post(`/contacts/${id}`);
      setChat(response.data.contact)
      setIncomingMsg(true)
      navigate('/chat')
  }


  return (
    <ContactContext.Provider
      value={{
        getContacts,
        contactList,
        setContactList,
        addContact,
        chat,
        setChat,
        setMessages,
        incomingMsg,
        setIncomingMsg,
        messages,
        getOneContact
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

const useContact = () => {
  const context = useContext(ContactContext);
  return context;
};

export default ContactContextProvider;
export { ContactContext, useContact };
