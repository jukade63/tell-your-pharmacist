import React from "react";
import { Box, Grid, Typography, Button, Paper, Alert } from "@mui/material";
import PageTitle from "../../components/common/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reverseGeocode } from "../../services/reverseGeocode";
import { usePharmacy } from "../../contexts/PharmacyContext";
import EditMap from "../common/EditMap";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function Settings() {
  const { user } = useAuth();
  const { openTime, updateInfo, updateOpeningTime } = usePharmacy();
  const [newLocation, setNewLocation] = useState({
    lat: user?.latitude,
    lng: user?.longitude,
  });
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [dayStart, setDayStart] = useState(openTime?.dayStart);
  const [dayEnd, setDayEnd] = useState(openTime?.dayEnd);

  const [timeStartHour, setTimeStartHour] = useState(
    openTime?.timeStart.split(":")[0]
  );
  const [timeStartMinute, setTimeStartMinute] = useState(
    openTime?.timeStart.split(":")[1]
  );
  const [timeEndHour, setTimeEndHour] = useState(
    openTime?.timeEnd.split(":")[0]
  );
  const [timeEndMinute, setTimeEndMinute] = useState(
    openTime?.timeEnd.split(":")[1]
  );
  const [address, setAddress] = useState("");

  useEffect(() => {
    reverseGeocode(user?.latitude, user?.longitude, setAddress);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInfo({
        email,
        latitude: newLocation.lat,
        longitude: newLocation.lng,
      });
      await updateOpeningTime({
        dayStart,
        dayEnd,
        timeStart: timeStartHour + ":" + timeStartMinute,
        timeEnd: timeEndHour + ":" + timeEndMinute,
      });
      navigate("/pharmacy");
    } catch (err) {
      setFormError(err.response.data.message);
      setTimeout(() => {
        setFormError("");
      }, 3000);
    }
  };

  return (
    <div>
      <PageTitle title="Settings" toPage="/pharmacy" />
      {formError && <Alert severity="error">{formError}</Alert>}
      <Box component="form" mt="10px" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <label htmlFor="firstName">Firstname</label>
            <input
              defaultValue={user?.firstName}
              id="firstName"
              disabled
              className="form-input disabled"
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="lastName">Lastname</label>
            <input
              defaultValue={user?.lastName}
              disabled
              id="lastName"
              className="form-input disabled"
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="phone">Phone number</label>
            <input
              defaultValue={user?.phoneNumber}
              id="phone"
              name="phoneNumber"
              disabled
              className="form-input disabled"
            />
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              value={email}
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <label htmlFor="dayStart">From</label>
            <select
              className="select"
              id="dayStart"
              value={dayStart}
              onChange={(e) => setDayStart(e.target.value)}
            >
              <option value={dayStart}>{dayStart}</option>
              {days.map((day) => {
                return (
                  <option value={day} key={day}>
                    {day}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="dayEnd">To</label>
            <select
              className="select"
              id="dayEnd"
              onChange={(e) => setDayEnd(e.target.value)}
            >
              <option value={dayEnd}>{dayEnd}</option>
              {days.map((day) => {
                return (
                  <option value={day} key={day}>
                    {day}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={3}>
            <label htmlFor="timeStartH">Open</label>
            <input
              className="form-input time"
              id="timeStartH"
              value={timeStartHour}
              onChange={(e) => setTimeStartHour(e.target.value)}
            />
          </Grid>
          <Grid item alignSelf="end" sx={{ mb: 1 }}>
            :
          </Grid>
          <Grid item xs={2}>
            <label htmlFor="timeEndM">minutes</label>
            <input
              className="form-input time"
              value={timeStartMinute}
              id="timeStartM"
              onChange={(e) => setTimeStartMinute(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <label htmlFor="timeEndH">Close</label>
            <input
              className="form-input time"
              value={timeEndHour}
              id="timeEndH"
              onChange={(e) => setTimeEndHour(e.target.value)}
            />
          </Grid>
          <Grid item alignSelf="end" sx={{ mb: 1 }}>
            :
          </Grid>
          <Grid item xs={2}>
            <label htmlFor="timeEndM">minutes</label>
            <input
              className="form-input time"
              value={timeEndMinute}
              id="timeEndM"
              onChange={(e) => setTimeEndMinute(e.target.value)}
            />
          </Grid>
        </Grid>
        <Paper sx={{ p: 1, my: 1 }}>
          <Typography sx={{ mb: 1 }}>
            Address :
            <Typography component="span" variant="body2" sx={{ ml: 0.5 }}>
              {address}
            </Typography>
          </Typography>
          <Typography>Choose in map</Typography>
          <EditMap
            center={{ lat: user.latitude, lng: user.longitude }}
            location={newLocation}
            setLocation={setNewLocation}
            setAddress={setAddress}
            height="240px"
          />
        </Paper>
        <Button variant="contained" fullWidth color="secondary" type="submit">
          Save
        </Button>
      </Box>
    </div>
  );
}

export default Settings;
