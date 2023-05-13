import { Box } from "@mui/material";
import NavigationBox from "../../components/common/NavigationBox";
import Orders from "../../components/common/Orders";

function OrderSummary() {
  return (
    <>
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Orders path="" />
      <NavigationBox toHome="/" toChat="/contacts" toSetting="/profile" />
      </Box>
    </>
  );
}

export default OrderSummary;
