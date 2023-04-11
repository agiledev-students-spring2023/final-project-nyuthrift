import './chatWindow.css'
import {FaPaperPlane} from 'react-icons/fa'; 
import axios from 'axios';
import React, { useState, useEffect } from 'react';



function ChatWindow({name}) {
    const [messages, setMessages] = useState([]);

  function handleFormSubmit(event) {
    event.preventDefault();
    const messageInput = event.target.querySelector('input[type="text"]');
    const message = {
      id: Date.now(),
      text: messageInput.value,
      senderName: 'Me',
    };
    setMessages([...messages, message]);
    messageInput.value = '';
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getMessages', {
          params: {
            contact_name: name
          }});

        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id}>
            <div className="chat-message">
              <div className="chat-message-sender">{message.senderName}</div>
              <div className="chat-message-text">{message.text}</div>
            </div>
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Type a message..." />
        <button type="submit"><FaPaperPlane /></button>
      </form>
    </div>
  );
}

  export default ChatWindow; 


