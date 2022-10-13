import { Button, Grid, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useProduct } from "../../contexts/ProductContext";
import { useOrder } from "../../contexts/OrderContext";

function OrderItem({ name, price, amount, productId }) {
  const { deleteItem } = useOrder();

  console.log('productId',productId);
  console.log('pName',name);

  return (
    <div>
      <Grid container alignItems="center" mb="5px" ml={1}>
        <Grid item xs="4">
          {name}
        </Grid>
        <Grid item xs="6">
          {amount} &times; {price.toFixed(2)}
          <Typography component="span" sx={{ ml: 2 }}>
            = {(amount * price).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs="2">
          <Button
            variant="text"
            sx={{ width: "30px", height: "30px", fontSize: "16px" }}
            onClick={() => deleteItem(productId)}
          >
            <DeleteOutlineIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderItem;
