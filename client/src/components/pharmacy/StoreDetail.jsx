import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import { usePharmacy } from "../../contexts/PharmacyContext";

function StoreDetail({ openTime, isOpen }) {
  const { updateIsOpen } = usePharmacy();
  const [checked, setChecked] = useState(isOpen);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    updateIsOpen({ isOpen: event.target.checked });
  };

  const label = checked ? "Open" : "Close";

  return (
    <Stack spacing={1} mt={1} p={1} alignItems="center">
      <Typography variant="body2">Working hours</Typography>
      <AccessTimeIcon />
      <Stack direction="row" spacing={2}>
        <Box textAlign="center">
          <Typography >
            {openTime?.dayStart} - {openTime?.dayEnd}
          </Typography>
          <Typography color='primary'>
            {openTime?.timeStart.substr(0, 5)} - {openTime?.timeEnd.substr(0, 5)}
          </Typography>
        </Box>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                color="success"
              />
            }
            label={label}
          />
        </FormGroup>
      </Stack>
    </Stack>
  );
}

export default StoreDetail;
