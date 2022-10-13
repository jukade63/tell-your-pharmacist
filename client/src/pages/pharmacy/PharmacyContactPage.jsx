import Contacts from "../../components/common/Contacts";
import NavigationBox from "../../components/common/NavigationBox";

function PharmacyContactPage() {
  return (
    <>
      <Contacts />
      <NavigationBox
        toHome="/pharmacy"
        toChat="/pharmacy/contacts"
        toSetting="/pharmacy"
      />
    </>
  );
}

export default PharmacyContactPage;
