import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { useOrder } from "../../contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import BasicSnackbar from "../common/BasicSnackbar";

function OrderList({contactId}) {
  const [checked, setChecked] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState("");
  const { createOrder, orderList, setOrderList} = useOrder();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  

  const total = orderList.reduce((acc, curr) => {
    acc += curr.price * curr.amount;
    return acc;
  }, 0);
  
  const totalWithDeliveryFee = deliveryFee
    ? (total + Number(deliveryFee)).toFixed(2)
    : total.toFixed(2);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
    setDeliveryFee("");
  };

  const handleCreateOrder = async () => {
    try {
      const orderObj = {
        customerId: contactId,
        orderDetails: orderList,
        deliveryFee,
      }
      await createOrder(orderObj);
      setOrderList([]);
      navigate("/pharmacy");
    } catch (error) {
      const errorMsg = error.response.data.message;
      setError(errorMsg);
      setOpen(true);
    }
  };

  return (
    <div>
      {orderList.map((item) => (
        <OrderItem key={item.productId} {...item} />
      ))}
      <Stack direction="row" alignItems="end" width={180} height="50px">
        <FormGroup>
          <FormControlLabel
            sx={{ width: "100px" }}
            control={<Checkbox checked={checked} onChange={handleCheck} />}
            label="ค่าส่ง"
          />
        </FormGroup>
        {checked && (
          <TextField
            sx={{ backgroundColor: "white", px: 1 }}
            variant="standard"
            margin="normal"
            autoFocus
            InputProps={{
            disableUnderline: true,
            }}
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(e.target.value)}
          />
        )}
      </Stack>

      <Divider sx={{ my: 1 }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography>Total</Typography>
        <Typography>{totalWithDeliveryFee}</Typography>
      </Stack>

      <Divider sx={{ my: 1 }} />
      <Box display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleCreateOrder}>
          Create order
        </Button>
        <BasicSnackbar
          open={open}
          severity="error"
          message={error}
          onClose={handleClose}
        />
      </Box>
    </div>
  );
}

export default OrderList;
