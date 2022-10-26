import { Grid, Stack, Typography } from "@mui/material";

function OrderDetailCard({ Product, amount, price }) {
  return (
    <Grid container direction="row">
      <Grid item xs={5}>
        <Typography sx={{ ml: 1 }}>{Product.name}</Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography>
          {amount} &times; {price.toFixed(2)}
        </Typography>
      </Grid>
      <Typography sx={{ ml: 1 }}>= {(amount * price).toFixed(2)} </Typography>
    </Grid>
  );
}

export default OrderDetailCard;
