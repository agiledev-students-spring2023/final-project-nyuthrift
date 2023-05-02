import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';

const ChatWindow = styled(Paper)(({ theme }) => ({
  height: '100vh',
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column-reverse',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#f5f5f5',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '8px',
    backgroundColor: '#f5f5f5',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: '#888',
  },
}));

const Message = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '10px',
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'flex-start',
}));

const Received = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  flexDirection: 'row',
  alignSelf: 'flex-start',
  maxWidth: '60%',
  wordWrap: 'break-word',
}));

const Sent = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  flexDirection: 'row-reverse',
  alignSelf: 'flex-end',
  maxWidth: '60%',
  wordWrap: 'break-word',
}));
const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(1),
}));

const Input = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(1),
}));

const SendButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: theme.spacing(1),
  backgroundColor: '#2980b9',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1a5276',
  },
}));


function ChatWindowComponent({ currentUserId }) {
  const location = useLocation();
  const conversationId = location.state.conversationId;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(`http://localhost:3000/api/messages/${conversationId}`,
          {
            headers: {
              userId: currentUserId,
            },
          });
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId, token]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/messages/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: message, user_id: currentUserId,
      }),
    });
    const data = await response.json();
    setMessages((prevMessages) => [...prevMessages, data.message]);
    setMessage('');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

return (
  <ChatWindow>
    <Stack spacing={2}>
    {messages.map((msg) => (
  <Grid
    container
    item
    component={msg.user_id === currentUserId ? Sent : Received}
    key={msg.id}
    direction="row"
    justifyContent={
      msg.user_id === currentUserId ? 'flex-end' : 'flex-start'
    }
  >
    <Grid item>
      <Typography variant="body1">
        {msg.user_id === currentUserId ? 'You' : msg.username}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2">{msg.content}</Typography>
    </Grid>
  </Grid>
))}

    </Stack>
    <Form onSubmit={handleSubmit}>
      <Input
        label="Type your message"
        variant="outlined"
        size="small"
        value={message}
        onChange={handleMessageChange}
      />
      <SendButton type="submit" variant="contained">
        Send
      </SendButton>
    </Form>
  </ChatWindow>
);

}

export default ChatWindowComponent;