import { Grid, Typography } from "@mui/material";

function OrderDetailCard({ Product, amount, price }) {
  return (
    
      <Grid container alignItems="center" mb="5px">
        <Grid item xs="6">
          <Typography sx={{ml: 1}} variant='body2'>{Product.name}</Typography>
        </Grid>
        <Grid item xs="3">
          {amount} &times; {price.toFixed(2)}
        </Grid>
        <Grid item xs="3">
          ={" "}
          <Typography component="span" sx={{ ml: 1 }}>
            {(amount * price).toFixed(2)}{" "}
          </Typography>
        </Grid> 
      </Grid>
    
  );
}

export default OrderDetailCard;
