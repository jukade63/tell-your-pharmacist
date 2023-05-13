import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

function SendTo({ address }) {

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={1} mx={1}>
          <MyLocationIcon />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">{address}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default SendTo;
