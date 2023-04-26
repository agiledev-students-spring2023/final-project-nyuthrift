import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ChatWindow({ currentUserId }) {
  const location = useLocation();
  const conversationId = location.state.conversationId;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  

  const token = localStorage.getItem('token'); // Get the JWT token from local storage

  useEffect(() => {
    
    async function fetchMessages() {
      try {
        console.log(token)
        const response = await fetch(`http://localhost:3000/api/messages/${conversationId}`, {
          headers: {
            userId: currentUserId// Include the JWT token in the headers
          },
        });
        const data = await response.json();
        console.log(data)
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
    console.log('Conversation ID in ChatWindow:', conversationId);
    console.log('Submitting message:', message);
    try {
      const response = await fetch(`http://localhost:3000/api/messages/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
        },
  
        body: JSON.stringify({ content: message, user: currentUserId }),
      });

      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      console.log('Message submitted:', response);
    } catch (error) {
      console.error('Error submitting message:', error);
    }

    setMessage('');
  }

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg._id} className={msg.sender === currentUserId ? 'sent' : 'received'}>
          <p>{msg.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;
