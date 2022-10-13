import React from "react";
import NavigationBox from "../../components/common/NavigationBox";
import Orders from "../../components/common/Orders";

function PharmacyOrderSummary() {
  return (
    <div>
      <Orders path='/pharmacy' />
      <NavigationBox toHome='/pharmacy' toChat='/pharmacy/contacts' toSetting='pharmacy'/>
    </div>
  );
}

export default PharmacyOrderSummary;
