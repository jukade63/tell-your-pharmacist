import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";

function ReviewItem({
  text,
  star,
  Customer: { firstName, lastName, profilePic },
}) {
  return (
    <Paper sx={{mb:0.5}}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={profilePic} />
        </ListItemAvatar>
        <ListItemText 
          primary={`${firstName} ${lastName}`}
          secondary={
            <Typography
              component="span"
              variant="body2"
              sx={{wordBreak: 'break-word', color: '#999'}}
            >
              {text}
            </Typography>
          }
        />
        <ListItemIcon
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Rating value={star} precision={0.5} size="small" readOnly />
        </ListItemIcon>
      </ListItem>
    </Paper>
  );
}

export default ReviewItem;
