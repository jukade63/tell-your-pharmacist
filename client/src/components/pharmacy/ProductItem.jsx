import { Button, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import React, { useState } from "react";
import { useProduct } from "../../contexts/ProductContext";

function ProductItem({ id, name, price, quantity }) {
  const { deleteProduct, updateProduct } = useProduct();
  const inputStyle = {
    width: 60,
    padding: 6,
    fontSize: 12,
    border: "1px solid lightGrey ",
  };
  const [editPrice, setEditPrice] = useState(false);
  const [editQuantity, setEditQuantity] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleUpdate = () => {
    const updated = { price: parseFloat(newPrice), quantity: +newQuantity };
    updateProduct(id, updated);
    setEditPrice(false);
    setEditQuantity(false);
  };

  const handleDelete = () => {
    deleteProduct(id);
  };

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 }, height: 41 }}
    >
      <TableCell component="td" scope="row" colSpan={2}>
        <Typography variant="body1">{name}</Typography>
      </TableCell>
      <TableCell
        sx={{ cursor: "pointer" }}
        onClick={() => setEditPrice(true)}
      >
        {editPrice ? (
          <input
            style={inputStyle}
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        ) : (
          <Typography variant="body1">{price.toFixed(2)}</Typography>
        )}
      </TableCell>
      <TableCell
        sx={{ cursor: "pointer" }}
        onClick={() => setEditQuantity(true)}
      >
        {editQuantity ? (
          <input
            type="number"
            style={inputStyle}
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        ) : (
          <Typography variant="body1">{quantity}</Typography>
        )}
      </TableCell>
      <TableCell>
        {editPrice || editQuantity ? (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            type="submit"
            disableElevation
            sx={{mr: 1, fontSize: 11}}
            onClick={handleUpdate}
          >
            submit
          </Button>
        ) : (
          <IconButton onClick={handleDelete} >
            <DeleteOutlineIcon color='primary'/>
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ProductItem;
