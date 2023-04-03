import React, { useState, useEffect } from 'react';
import ChatWindow from './chatwindow';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/messages');
        console.log(response.data)
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="Chat">
      <div className="chatWindow">
        <ChatWindow messages={messages} />
      </div>
    </div>
  );
};

export default Chat;
