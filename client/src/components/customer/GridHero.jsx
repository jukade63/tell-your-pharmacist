import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import image1 from "../../assets/images/counseling.jpg";
import image2 from "../../assets/images/vitamin2.jpg";
import image3 from "../../assets/images/delivery.jpg";
import image4 from "../../assets/images/pharmacy.jpg";

function GridHero() {
  const gridItemStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    width: "80%",
    height: "150px",
    textAlign: "center",
  };

  return (
    <Container sx={{ backgroundColor: "#FAFBFD", p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <Avatar src={image1} sx={{ width: 60, height: 60 }} />
            <Typography variant="subtitle2" mt={1}>
              Pharmacist counseling
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <Avatar src={image3} sx={{ width: 60, height: 60 }} />
            <Typography variant="subtitle2" mt={1}>
              Home delivery
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <Avatar src={image2} sx={{ width: 60, height: 60 }} />
            <Typography variant="subtitle2" mt={1}>
              Drugs and Supplements
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <Avatar src={image4} sx={{ width: 60, height: 60 }} />
            <Typography variant="subtitle2" mt={1}>
              1000+ Qualified pharmacists
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GridHero;
