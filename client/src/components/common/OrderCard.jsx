import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useOrder } from "../../contexts/OrderContext";
import { dateTimeFormat } from "../../helpers/dateTimeFormat";

function OrderCard({ order, user, path }) {
  const { getOrderDetail } = useOrder();

  let orderFrom, profilePic;
  if (order.pharmacyId === user.id) {
    orderFrom = order.Customer.firstName;
    profilePic = order.Customer.profilePic;
  } else if (order.customerId === user.id) {
    orderFrom = order.Pharmacy.storeName;
    profilePic = order.Pharmacy.profilePic;
  }

  const primaryText = <Typography variant="subtitle1">{orderFrom}</Typography>;
  const secondaryText = (
    <Typography variant="body2" color="#888">
      {dateTimeFormat(order.createdAt)}
    </Typography>
  );

  const selectOrder = () => {
    getOrderDetail(path, order.id);
  };

  let statusStyle;
  if (order.status === "รอชำระเงิน") {
    statusStyle = "lightPink";
  }
  if (order.status === "ชำระเงินแล้ว") {
    statusStyle = "lightBlue";
  }
  if (order.status === "กำลังนำส่ง") {
    statusStyle = "moccasin";
  }
  if (order.status === "สำเร็จ") {
    statusStyle = "lightGreen";
  }

  return (
    <List onClick={selectOrder}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar src={profilePic} />
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={secondaryText} />

        <Typography
          component="span"
          sx={{ background: statusStyle, p: "10px", borderRadius: "5px" }}
        >
          {order.status}
        </Typography>
      </ListItemButton>
      <Divider />
    </List>
  );
}

export default OrderCard;
