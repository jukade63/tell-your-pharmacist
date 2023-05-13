import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useProduct } from "../../contexts/ProductContext";

function AddProduct() {
  const { addProduct} = useProduct();
  const [newItem, setNewItem] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault()
    const newProductObj = {
      name: newItem,
      price: parseFloat(price),
      quantity: +quantity,
    };
    addProduct(newProductObj);
    setNewItem("");
    setPrice("");
    setQuantity("");
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          backgroundColor: "white",
          my: 0.5
        },
      }}
      onSubmit={handleAddProduct}
    >
      <TextField
        label="Product Name"
        variant="outlined"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        sx={{ width: "100%", mx: "auto" }}
      />

      <Stack direction="row" spacing={1}>
        <TextField
          label="price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          size="small"
          type="number"
          defaultValue="0"
        />
        <TextField
          label="quantity"
          defaultValue="0"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          size="small"
          type="number"
        />
      </Stack>
      <Button
        variant="contained"
        sx={{ mx: "auto", width: "100%", mt: 0.5 }}
        type='submit'
      >
        Add Product
      </Button>
    </Box>
  );
}

export default AddProduct;
