import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useOrder } from "../../contexts/OrderContext";
import { useProduct } from "../../contexts/ProductContext";
import BasicSnackbar from "../common/BasicSnackbar";

function OrderInput() {
  let [amount, setAmount] = useState(1);
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");
  const { orderList, setOrderList } = useOrder();
  const { products } = useProduct();
  const [open, setOpen] = useState(false);

  // close error snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  const addItem = () => {
    const existingItem = orderList.find((el) => el.name === newItem);
    const availableItem = products.find((el) => el.name === newItem);
    if (!availableItem) {
      setError("Product not found");
      setNewItem("");
      setError("");
      return
    }
    if (existingItem) {
      const idx = orderList.findIndex((el) => el.name === existingItem.name);
      if (idx !== -1) {
        const newOrderList = [...orderList];
        newOrderList[idx].amount += amount;
        setOrderList(newOrderList);
      }
    } else {
      setOrderList([
        ...orderList,
        {
          productId: availableItem.id,
          name: availableItem.name,
          price: availableItem.price,
          amount,
        },
      ]);
    }
    setNewItem("");
  };

  return (
    <Stack alignItems="center">
      {error && (
        <BasicSnackbar
          message={error}
          severity="error"
          onClose={handleClose}
          open={open}
        />
      )}
      <TextField
        label="ชื่อสินค้า"
        variant="outlined"
        sx={{ backgroundColor: "white" }}
        fullWidth
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <Stack backgroundColor="#fffcfe" width="100%">
        {products
          .filter((item) => {
            const searchTerm = newItem.toLowerCase();
            const name = item.name.toLowerCase();

            return (
              searchTerm && name.includes(searchTerm) && name !== searchTerm
            );
          })
          .slice(0, 5)
          .map((item) => (
            <>
              <MenuItem onClick={() => setNewItem(item.name)} key={item.id}>
                {item.name}
              </MenuItem>
            </>
          ))}
      </Stack>

      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        width="100%"
        spacing={1}
        mt={1}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => setAmount((amount -= 1))}
          sx={{ flex: 1 }}
        >
          <RemoveIcon />
        </Button>
        <Typography sx={{ flex: 1 }} textAlign="center" variant='subtitle1'>
          {amount}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => setAmount((amount += 1))}
          sx={{ flex: 1 }}
          disableElevation
        >
          <AddIcon />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={addItem}
          sx={{ flex: 2 }}
          disableElevation
        >
          <Typography sx={{ color: "white" }} variant='subtitle2'>Add item</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}

export default OrderInput;
