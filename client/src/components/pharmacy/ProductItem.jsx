import { Button, TableCell, TableRow, Typography } from "@mui/material";
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
      <TableCell component="th" scope="row" colSpan={2}>
        {name}
      </TableCell>
      <TableCell
        align="right"
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
          <Typography variant="body2">{price.toFixed(2)}</Typography>
        )}
      </TableCell>
      <TableCell
        align="right"
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
          <Typography variant="body2">{quantity}</Typography>
        )}
      </TableCell>
      <TableCell>
        {editPrice || editQuantity ? (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ mt: 0.7, mr: 1, fontSize: 10 }}
            onClick={handleUpdate}
          >
            submit
          </Button>
        ) : (
          <Button onClick={handleDelete}>
            <DeleteOutlineIcon />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ProductItem;
