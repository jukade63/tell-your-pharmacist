import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
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
    <Typography variant="body3" color="#888">
      {dateTimeFormat(order.createdAt)}
    </Typography>
  );

  const selectOrder = () => {
    getOrderDetail(path, order.id);
  };

  let statusStyle;
  if (order.status === "PENDING") {
    statusStyle = "lightPink";
  }
  if (order.status === "PAID") {
    statusStyle = "lightBlue";
  }
  if (order.status === "DELIVERING") {
    statusStyle = "moccasin";
  }
  if (order.status === "COMPLETED") {
    statusStyle = "lightGreen";
  }

  return (
      <Paper onClick={selectOrder} sx={{mb:0.5}}>
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
      </Paper>
  );
}

export default OrderCard;
