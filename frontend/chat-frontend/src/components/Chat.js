import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Box,
} from "@mui/material";

const Chat = ({ token }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL, { query: { token } });
    newSocket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [token]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <List style={{ maxHeight: "400px", overflowY: "auto" }}>
          {messages.map((msg, index) => (
            <ListItem key={index}>{msg}</ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          label="Type a message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          style={{ marginTop: "10px" }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
