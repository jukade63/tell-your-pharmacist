import { Box, Typography, Stack, Avatar } from "@mui/material";
import { format } from "timeago.js";
import { useEffect, useRef } from "react";

function Message({ message, currentUser }) {
  const scrollRef = useRef();

  const own = message.from === currentUser;
  const imgMsg = message.media
    ? { p: "", borderRadius: "0", background: "none" }
    : { p: "10px", borderRadius: "5px" };

  const msgFromStyle = {
    background: "#A83A7F",
    alignSelf: "end",
    color: "#eee",
    wordBreak: "break-word",
    ...imgMsg,
  };

  const msgToStyle = {
    background: "lightGrey",
    alignSelf: "start",
    ...imgMsg,
    wordBreak: "break-word",
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Stack sx={own && { textAlign: "right", mr:'20px' }} ref={scrollRef}>
      <Typography variant="body1" sx={own ? msgFromStyle : msgToStyle}>
        {message.text}
        {message.media && (
          <img
            src={message.media}
            alt="chat-img"
            style={{ maxWidth: "200px" }}
          />
        )}
      </Typography>
      <Box mb={1}>
        <Typography variant="body2" color="#999">
          {format(message.createdAt.toDate())}
        </Typography>
      </Box>
    </Stack>
  );
}

export default Message;
