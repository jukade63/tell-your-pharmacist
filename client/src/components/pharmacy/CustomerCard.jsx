import {
  Avatar,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import ScaleIcon from "@mui/icons-material/Scale";
import HeightIcon from "@mui/icons-material/Height";
import SickIcon from "@mui/icons-material/Sick";

function CustomerCard({
  firstName,
  profilePic,
  lastName,
  age,
  allergy,
  height,
  weight,
  medication,
  diseases,
}) {
  return (
    <Stack>
      <Stack direction="column" alignItems="center">
        <Avatar src={profilePic} sx={{ width: 80, height: 80, mb: 1 }} />
        <Typography>
          {firstName} {lastName}
        </Typography>
      </Stack>
      <Paper sx={{ mt: 5 }} elevation={0}>
        <Grid container py={2}>
          <Grid item xs={6}>
            <ListItem>
              <ListItemIcon>
                <ElderlyWomanIcon />
              </ListItemIcon>
              <ListItemText primary={age || "-"} secondary="age" />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemIcon>
                <CoronavirusIcon />
              </ListItemIcon>
              <ListItemText primary={allergy || "-"} secondary="Allergy" />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemIcon>
                <ScaleIcon />
              </ListItemIcon>
              <ListItemText
                primary={weight !== null ? `${weight} kg.` : "-"}
                secondary="Weight"
              />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemIcon>
                <HeightIcon />
              </ListItemIcon>
              <ListItemText
                primary={height !== null ? `${height} cm.` : "-"}
                secondary="Height"
              />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemIcon>
                <MedicationLiquidIcon />
              </ListItemIcon>
              <ListItemText
                primary={medication || "-"}
                secondary="Medications"
              />
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              <ListItemIcon>
                <SickIcon />
              </ListItemIcon>
              <ListItemText
                primary={diseases || "-"}
                secondary="Chronic Diseases"
              />
            </ListItem>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}

export default CustomerCard;
