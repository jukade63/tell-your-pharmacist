import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditMap from "../../components/common/EditMap";
import PageTitle from "../../components/common/PageTitle";
import StoreMap from "../../components/common/StoreMap";
import SendTo from "../../components/customer/SendTo";
import StoreCard from "../../components/customer/StoreCard";
import { useCustomer } from "../../contexts/CustomerContext";
import { usePharmacy } from "../../contexts/PharmacyContext";
import { reverseGeocode } from "../../services/reverseGeocode";

function FoundStores() {
  const { lat, lng } = useParams();
  const { pharmacies } = usePharmacy();
  const { updateAddress } = useCustomer();
  const [newLocation, setNewLocation] = useState({
    lat: +lat,
    lng: +lng,
  });
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const onEditAddress = () => {
    updateAddress({ address });
    setIsEdit(false);
  };
  const onCancel = () => {
    setNewLocation({
      lat: +lat,
      lng: +lng,
    });
    setIsEdit(false);
  };
  useEffect(() => {
    reverseGeocode(lat, lng, setAddress);
  }, []);

  return (
    <Grid container height="100%">
      <Grid item xs={12}>
        <PageTitle title="ผลการค้นหา" toPage="/" />
        <Typography>Send to</Typography>
        <Paper elevation={0} sx={{ p: 0.5 }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ flex: 1 }}>
              <SendTo address={address} />
            </Box>
            {!isEdit && (
              <Button sx={{ fontSize: 14 }} onClick={() => setIsEdit(true)}>
                Change
              </Button>
            )}
          </Stack>
        </Paper>
        {isEdit ? (
          <Box my={1}>
            <EditMap
              center={{ lat: +lat, lng: +lng }}
              location={newLocation}
              setLocation={setNewLocation}
              setAddress={setAddress}
              height="360px"
            />
            <Button size="small" variant="contained" onClick={onEditAddress}>
              save
            </Button>
            <Button size="small" onClick={onCancel}>
              cancel
            </Button>
          </Box>
        ) : (
          <Box my={1}>
            <StoreMap center={newLocation} pharmacies={pharmacies} />
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        {pharmacies.map((p) => (
          <StoreCard key={p.id} {...p} />
        ))}
      </Grid>
    </Grid>
  );
}

export default FoundStores;
