import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar,Stack } from "@mui/material";
import axios from "../../config/axios";
import { useState } from "react";

const style = {
  width: 340,
  height: 300,
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
  p: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  mx:'auto'
};

export default function BasicModal({
  open,
  profilePic,
  setOpen,
  endpoint,
  fetchUser,
}) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setImg(null);
    setOpen(false);
  };

  const handleClickSaveProfilePic = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePic", img);
      await axios.patch(`/${endpoint}/upload`, formData);
      fetchUser();
      setOpen(false);
      setImg(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Stack sx={style} spacing={4}>
        <Avatar
          src={img ? URL.createObjectURL(img) : profilePic}
          sx={{ width: 75, height: 75 }}
        />
        <input
          accept="image/*"
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files[0]) {
              setImg(e.target.files[0]);
            }
          }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={handleClickSaveProfilePic}
          disabled={loading}
        >
          Save
        </Button>
      </Stack>
    </Modal>
  );
}
