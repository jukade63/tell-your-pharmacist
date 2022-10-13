import NavigationBox from "../../components/common/NavigationBox";
import Orders from "../../components/common/Orders";

function OrderSummary() {
  return (
    <div>
      <Orders path=''/>
      <NavigationBox toHome="/" toChat="/contacts" toSetting="/profile" />
    </div>
  );
}

export default OrderSummary;
