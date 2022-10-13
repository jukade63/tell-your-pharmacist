import NavigationBox from "../../components/common/NavigationBox";
import StoreInfo from "../../components/customer/StoreInfo";

function SelectedStore() {
  return (
    <>
      <StoreInfo />
      <NavigationBox toHome='/' toChat='/contacts' toSetting='/profile' />
    </>
  );
}

export default SelectedStore;
