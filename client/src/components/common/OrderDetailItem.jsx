import { Grid, Stack, Typography } from "@mui/material";

function OrderDetailItem({ Product, amount, price }) {
  return (
    <Grid container direction="row" mt={1}>
      <Grid item xs={5}>
        <Typography sx={{ ml: 1 }} variant='subtitle3'>{Product.name}</Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant='subtitle3'>
          {amount} &times; {price.toFixed(2)}
        </Typography>
      </Grid>
      <Typography variant='subtitle3' ml="auto">= {(amount * price).toFixed(2)} </Typography>
    </Grid>
  );
}

export default OrderDetailItem;
