import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function BasicMenu({ contacts, setSelectedContact }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedContact(contacts[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        onClick={handleClickListItem}
        disableElevation
        endIcon={<KeyboardArrowDownIcon />}
        variant="contained"
        size="small"
        color="secondary"
      >
        <Typography variant="body2"color='white'>{contacts[selectedIndex]?.contactName}</Typography>
        
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {contacts.map((contact, index) => (
          <MenuItem
            sx={{ minWidth: "340px" }}
            key={contact.id}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <Typography variant="body2">{contact.contactName}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
