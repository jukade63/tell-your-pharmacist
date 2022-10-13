import Contacts from "../../components/common/Contacts";
import NavigationBox from "../../components/common/NavigationBox";

function ContactPage() {
  return (
    <>
      <Contacts />
      <NavigationBox toHome="/" toChat="/contacts" toSetting="/profile" />
    </>
  );
}

export default ContactPage;
