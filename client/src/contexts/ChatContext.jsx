import { createContext } from "react";

const ChatContext = createContext()

function ChatContextProvider({children}){

    

    return <ChatContext.Provider>{children}</ChatContext.Provider>
}