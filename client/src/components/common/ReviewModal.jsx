import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Rating, Stack, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { usePharmacy } from "../../contexts/PharmacyContext";
import { useState } from "react";

const style = {
  width: 340,
  height: 380,
  mx: "auto",
  mt: 5,
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
  p: 2,
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export default function ReviewModal({ open, setOpen, order:{customerId, pharmacyId} }) {
  const {addNewReview} = usePharmacy()
  const [star, setStar] = useState(0)
  const [text, setText] = useState('')

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewReview = (e) => {
    e.preventDefault()
    addNewReview({text, star: +star, customerId, pharmacyId }, pharmacyId)
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack sx={style} component='form' onSubmit={handleNewReview}>
        <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
        <Typography varian='subtitle1'>Completed</Typography>

        <Rating
          icon={<StarIcon sx={{ fontSize: 30 }} />}
          emptyIcon={
            <StarOutlineIcon style={{ opacity: 0.55 }} sx={{ fontSize: 30 }} />
          }
          value={star} onChange={(e)=>setStar(e.target.value)}
        />

        <Stack alignItems="center" width="100%">
          <Typography>Write a review</Typography>
          <TextField multiline rows={3} fullWidth onChange={(e)=>setText(e.target.value)}/>
        </Stack>
        <Button variant="contained" color="secondary" type='submit' sx={{textTransform:'none'}}>
          Done
        </Button>
      </Stack>
    </Modal>
  );
}
