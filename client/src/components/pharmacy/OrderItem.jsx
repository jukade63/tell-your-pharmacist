import { Button, Grid, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useOrder } from "../../contexts/OrderContext";

function OrderItem({ name, price, amount, productId }) {
  const { deleteItem } = useOrder();

  return (
      <Grid container alignItems="center" mb="5px" ml={1}>
        <Grid item xs={4}>
          <Typography variant="subtitle3">{name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle3">
            {amount} &times; {price.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle3">
            = {(amount * price).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="text"
            sx={{ width: "30px", height: "30px", fontSize: "16px" }}
            onClick={() => deleteItem(productId)}
          >
            <DeleteOutlineIcon />
          </Button>
        </Grid>
      </Grid>
    
  );
}

export default OrderItem;