import { Avatar, Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { usePharmacy } from "../../contexts/PharmacyContext";
import BasicModal from "../common/BasicModal";

function HomeHeader({ firstName, lastName, storeName, profilePic}) {
  const [open, setOpen] = useState(false);
  const {fetchPharmacy} = usePharmacy()
  
  return (
    <Stack justifyContent="space-between" alignItems="center" spacing={1}>
      <Typography variant="h3">{storeName}</Typography>
      <IconButton onClick={() => setOpen(true)}>
        {profilePic ? (
          <Avatar
            sx={{ width: 90, height: 90 }}
            src={profilePic} 
          ></Avatar>
        ) : (<Avatar sx={{ width: 60, height: 60 }}></Avatar>)}
      </IconButton>
      <BasicModal
        open={open}
        profilePic={profilePic}
        setOpen={setOpen}
        endpoint='pharmacies'
        fetchUser={fetchPharmacy}
      />
      <Grid item xs={8} textAlign="center" sx={{ alignSelf: "center" }}>
        <Paper sx={{ bgcolor: "white", py: 2,px:4, borderRadius: 1}} elevation={0}>
          <Typography variant="subtitle2" color="primary">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2">Pharmacist</Typography>
        </Paper>
      </Grid>
    </Stack>
  );
}

export default HomeHeader;