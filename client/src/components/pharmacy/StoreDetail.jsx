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

  const label = checked ? "เปิด" : "ปิด";

  return (
    <Stack spacing={1} mt={1} p={1} alignItems="center">
      <Typography variant="subtitle2">เวลาปฏิบัติการ</Typography>
      <AccessTimeIcon />
      <Stack direction="row" spacing={2}>
        <Box textAlign="center">
          <Typography variant="subtitle2" fontWeight="600" color="#A83A7F">
            {openTime?.dayStart} - {openTime?.dayEnd}
          </Typography>
          <Typography variant="subtitle2" fontWeight="600" color="#A83A7F">
            {openTime?.timeStart.substr(0, 5)} - {openTime?.timeEnd.substr(0, 5)} น.
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
