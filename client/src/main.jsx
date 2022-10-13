import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import AuthContextProvider from "./contexts/AuthContext";
import PharmacyContextProvider from "./contexts/PharmacyContext";
import OrderContextProvider from "./contexts/OrderContext";
import ContactContextProvider from "./contexts/ContactContext";
import ProductContextProvider from "./contexts/ProductContext";
import CustomerContextProvider from "./contexts/CustomerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PharmacyContextProvider>
          <CustomerContextProvider>
            <AuthContextProvider>
              <OrderContextProvider>
                <ProductContextProvider>
                  <ContactContextProvider>
                    <CssBaseline />
                    <App />
                  </ContactContextProvider>
                </ProductContextProvider>
              </OrderContextProvider>
            </AuthContextProvider>
          </CustomerContextProvider>
        </PharmacyContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
