import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  chatWindow: {
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
  },
  message: {
    padding: theme.spacing(1),
    borderRadius: '10px',
    marginBottom: theme.spacing(1),
  },
  received: {
    //backgroundColor: '#f1f0f0',
    marginTop: theme.spacing(1),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  sent: {
    
    marginBottom: theme.spacing(1),
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  form: {
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(1),
  },
  input: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  button: {
    minWidth: 'auto',
    padding: theme.spacing(1),
    backgroundColor: '#2980b9',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1a5276',
    },
  },
}));


function ChatWindow({ currentUserId }) {
  const location = useLocation();
  const conversationId = location.state.conversationId;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(`http://localhost:3000/api/messages/${conversationId}`, {
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
        body: JSON.stringify({ content: message, user: currentUserId }),
      });

      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error('Error submitting message:', error);
    }

    setMessage('');
  }

  const classes = useStyles();

  return (
    <Paper className={classes.chatWindow}>
      <Box p={2}>
        <Grid container direction="column" spacing={2}>
          {messages.map((msg) => (
            <Grid item key={msg._id} className={msg.sender === currentUserId ? classes.sent : classes.received}>
              <Paper className={classes.message}>
                <Typography variant="body1">{msg.content}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            className={classes.input}
            variant="outlined"
            size="small"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
          />
          <Button className={classes.button} variant="contained" onClick={handleSubmit}

        >
        Send
      </Button>
      </form>
    </Box>
  </Paper>
);
}

export default ChatWindow;
