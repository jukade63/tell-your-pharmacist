import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import Message from "../../components/common/Message";
import UploadIcon from "@mui/icons-material/Upload";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../contexts/AuthContext";
import { useContact } from "../../contexts/ContactContext";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import ChatHeader from "../../components/common/ChatHeader";

function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [img, setImg] = useState(null);
  const { user } = useAuth();
  const { chat, messages, setMessages, setIncomingMsg } = useContact();
  const user1 = user?.id;

  let user2;
  if (chat.pharmacyId === user.id) {
    user2 = chat.customerId;
  } else if (chat.customerId === user.id) {
    user2 = chat.pharmacyId;
  }

  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  useEffect(() => {
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    console.log("user1", user1);
    console.log("user2", user2);
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
  }, [user1, user2]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    console.log("user1", user1);
    console.log("user2", user2);

    await addDoc(collection(db, "messages", id, "chat"), {
      text: newMessage,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text: newMessage,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });
    setNewMessage("");
    setIncomingMsg(true)
    setImg(null);
  };

  return (
    <Stack height='100vh'>
      <ChatHeader />
      <Box sx={{height: "100%", overflow: "auto", mt:3}}>
        {messages.length
          ? messages.map((msg, i) => (
              <Message key={i} message={msg} currentUser={user1} chat={chat} />
            ))
          : null}
      </Box>

      {/* message form */}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          position: 'fixed',
          bottom: 0,
          width: "95%",
        minWidth: 340,
        maxWidth: 575,
        }}
        onSubmit={handleSubmit}
      >
        {img && <img src={URL.createObjectURL(img)} style={{ width: 40 }} />}
        <IconButton sx={{ p: "10px" }} component="label">
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <UploadIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: 14 }}
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          autoFocus
          placeholder="write a message..."
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" color="secondary">
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}

export default Chat;