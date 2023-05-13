import { Box, Grid, Button, Typography} from "@mui/material";
import PageTitle from "../../components/common/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

function EditInfo() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [allergy, setAllergy] = useState("");
  const [diseases, setDiseases] = useState("");
  const [medications, setMedications] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetctInfo = async () => {
      const res = await axios.get("/customers/healthInfo");
      const info = res.data.healthInfo;
      setAge(info.age);
      setWeight(info.weight);
      setHeight(info.height);
      setAllergy(info.allergy);
      setDiseases(info.diseases);
      setMedications(info.medications);
      setEmail(user.email);
    };
    fetctInfo();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateInfo({age, weight, height, allergy, medications, diseases});
    } catch (error) {
      console.log(error);
    }
    navigate("/profile");
  };

  return (
    <div>
      <PageTitle title="แก้ไขข้อมูล" toPage="/" />
      <Box component='form' mt="10px" onSubmit={handleSubmit}>
        {user && (
          <>
            <label htmlFor="firstName" ><Typography>Firstname</Typography></label>
            <input
              defaultValue={user.firstName}
              id="firstName"
              disabled
              className="form-input"
            />

            <label htmlFor="lastName" >Lastname</label>
            <input
              defaultValue={user.lastName}
              disabled
              id="lastName"
              className="form-input"
            />

            <label htmlFor="phone">Phone number</label>
            <input
              defaultValue={user.phoneNumber}
              id="phone"
              name="phoneNumber"
              disabled
              className="form-input"
            />

            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              value={email}
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <>
          <label htmlFor="age">Age</label>
          <input
            className="form-input"
            value={age}
            id="age"
            onChange={(e) => setAge(e.target.value)}
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label htmlFor="weight">Weight (kg.)</label>
              <input
                className="form-input"
                value={weight}
                id="weight"
                onChange={(e) => setWeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="height">Height (cm.)</label>
              <input
                className="form-input"
                value={height}
                id="height"
                onChange={(e) => setHeight(e.target.value)}
              />
            </Grid>
          </Grid>
          <label htmlFor="allergy">Allergy</label>
          <input
            className="form-input"
            value={allergy}
            id="allergy"
            onChange={(e) => setAllergy(e.target.value)}
          />
          <label htmlFor="diseases">Chronic diseases</label>
          <input
            className="form-input"
            value={diseases}
            id="diseases"
            onChange={(e) => setDiseases(e.target.value)}
          />
          <label htmlFor="medications">Currently taking medications/supplements</label>
          <input
            className="form-input"
            value={medications}
            id="medications"
            onChange={(e) => {
              setMedications(e.target.value);
            }}
          />
        </>

        <Button variant="contained" fullWidth color="secondary" type="submit">
          Save
        </Button>
      </Box>
    </div>
  );
}

export default EditInfo;
