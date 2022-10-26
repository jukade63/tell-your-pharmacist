import {
  Paper,
  Stack,
  Typography,
  Box,
  Button,
  Divider,
  Avatar,
  Rating,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PageTitle from "../common/PageTitle";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";
import { useContact } from "../../contexts/ContactContext";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { reverseGeocode } from "../../services/reverseGeocode";
import { usePharmacy } from "../../contexts/PharmacyContext";

function StoreInfo() {
  const theme = useTheme();
  const { id, distance } = useParams();
  const [pharmacy, setPharmacy] = useState({});
  const {reviews, getReviews, getPharmacyById} = usePharmacy()
  const { addContact, setIncomingMsg } = useContact();
  const [address, setAddress] = useState("");
  
  const fetchPharmacy = async () => {
    const { data } = await getPharmacyById(id);
    reverseGeocode(data.pharmacy.latitude, data.pharmacy.longitude, setAddress);
    setPharmacy(data.pharmacy);
  };
  
  useEffect(() => { 
    fetchPharmacy();
    getReviews(id)
  }, [id]);
  
  const ratingAve = reviews?.reduce((acc, el)=>{
    acc += el.star/reviews.length
    return acc
  }, 0)


  const renderedSwitchIcon = pharmacy?.isOpen ? (
    <ToggleOnIcon color="success" fontSize='large' />
  ) : (
    <ToggleOffIcon color="disabled" fontSize='large'/>
  );


  return (
    <>
      <PageTitle title="ข้อมูลร้านยา" toPage="/" />
      <Stack justifyContent="center" height="740px">
        <Paper elevation={2}>
          <Stack spacing={1} alignItems="center">
            <Box
              sx={{
                background: theme.palette.secondary.main,
                padding: "0.8em",
                width: "100%",
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle1" color='white'>{pharmacy.storeName}</Typography>
            </Box>
            <Avatar
              src={pharmacy.profilePic}
              alt="pharmacist"
              width="100px"
              sx={{ width: 75, height: 75 }}
            />
            <Typography variant="subtitle1">เภสัชกร</Typography>
            <Typography variant="subtitle2" color="primary">
              {`${pharmacy.firstName} ${pharmacy.lastName}`}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          {pharmacy && (
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              ml={2}
              mb={1}
              spacing={2}
            >
              <PinDropIcon />
              <Typography variant="body2">{address}</Typography>
            </Stack>
          )}
          <Divider sx={{ my: 1 }} />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            alignItems="center"
          >
            {distance && (
              <Stack alignItems="center">
                <DirectionsWalkIcon />
                <Typography variant="body2" color="primary">
                  {(distance / 1000).toFixed(2)} km
                </Typography>
                <Link to={`/reviews/${id}`}>
                  <Button>
                    <Rating readOnly size="small" value={ratingAve} precision={0.5} />
                  </Button>
                </Link>
              </Stack>
            )}
            
            <Stack>
              {renderedSwitchIcon} {pharmacy?.isOpen ? "เปิด" : "ปิด"}
            </Stack>
            <Stack spacing={1} pb={1} alignItems="center">
              <Typography variant="subtitle2">เวลาปฏิบัติการ</Typography>
              <AccessTimeIcon />
              <Typography variant="subtitle2" fontWeight="600" color="#A83A7F">
                จันทร์ - ศุกร์
              </Typography>
              <Typography variant="subtitle2" fontWeight="600" color="#A83A7F">
                08.00 - 20.00 น.
              </Typography>
            </Stack>
          </Stack>
        </Paper>
        <Box flex={1} mx="auto" mt={2}>
          <Button
            variant="contained"
            startIcon={<ChatOutlinedIcon />}
            onClick={() => {
              addContact(id);
              setIncomingMsg(true);
            }}
          >
            คุยกับเภสัชกร
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default StoreInfo;
