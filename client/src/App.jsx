import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/customer/Home";
import Login from "./pages/customer/Login";
import StoreLogin from "./pages/pharmacy/Login";
import StoreSignup from "./pages/pharmacy/Signup";
import StoreHome from "./pages/pharmacy/Home";
import Signup from "./pages/customer/Signup";
import EditInfo from "./pages/customer/EditInfo";
import FoundStores from "./pages/customer/FoundStores";
import SelectedStore from "./pages/customer/SelectedStore";
import Profile from "./pages/customer/Profile";
import './index.css';
import ContactPage from "./pages/customer/ContactPage";
import Chat from "./pages/common/Chat";
import Reviews from "./pages/customer/Reviews";
import Dispense from "./pages/pharmacy/Dispense";
import CustomerInfo from "./pages/pharmacy/CustomerInfo";
import OrderDetailPage from "./pages/customer/OrderDetailPage";
import PharmacyContactPage from "./pages/pharmacy/PharmacyContactPage";
import OrderSummary from "./pages/customer/OrderSummary";
import { usePharmacy } from "./contexts/PharmacyContext";
import { useAuth } from "./contexts/AuthContext";
import { useCustomer } from "./contexts/CustomerContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PharmacyOrderSummary from "./pages/pharmacy/PharmacyOrderSummary";
import PharmacyOrderDetail from "./pages/pharmacy/PharmacyOrderDetail";
import StockManagement from "./pages/pharmacy/StockManagement";
import Settings from "./components/pharmacy/Settings";

function App() {
  const { pharmacy } = usePharmacy();
  const { customer } = useCustomer();

  return (
    <>
      <Routes>
        {/* public routes  */}
        <Route path="new" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="pharmacy/new" element={<StoreSignup />} />
        <Route path="pharmacy/login" element={<StoreLogin />} />
        <Route path="chat" element={<Chat />} />
        <Route path="/" element={<Home />} />
        <Route path="/pharmacy" element={<StoreHome />} />
        <Route path="reviews/:pharmacyId" element={<Reviews />} />

        {/* customer routes */}
        <Route
          element={<ProtectedRoute user={!!customer} redirectPath="login" />}
        >
          <Route path="edit" element={<EditInfo />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contacts" element={<ContactPage />} />
          <Route path="orders" element={<OrderSummary />} />
          <Route path="orders/:orderId" element={<OrderDetailPage />} />
          <Route path="stores-found/:lat/:lng" element={<FoundStores />} />
          <Route path="stores/:id/:distance" element={<SelectedStore />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        {/* pharmacy routes */}
        <Route
          element={
            <ProtectedRoute user={!!pharmacy} redirectPath="pharmacy/login" />
          }
        >
          <Route path="pharmacy">
            <Route path="dispense" element={<Dispense />} />
            <Route path="setting" element={<Settings />} />
            <Route path="customer-info/:id" element={<CustomerInfo />} />
            <Route path="contacts" element={<PharmacyContactPage />} />
            <Route path="orders" element={<PharmacyOrderSummary />} />
            <Route path="orders/:orderId" element={<PharmacyOrderDetail />} />
            <Route path='stocks' element={<StockManagement/>}/>
            <Route path="*" element={<Navigate to="/pharmacy" />} />
          </Route>
          <Route path="*" element={<Navigate to="/pharmacy" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
