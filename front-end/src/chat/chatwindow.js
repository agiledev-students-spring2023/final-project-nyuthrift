import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

function ChatWindow({ messages }) {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      id: Date.now(),
      text: inputValue,
      senderName: 'Me',
    };
    setChatMessages([...chatMessages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {chatMessages.map((message) => (
          <div key={message.id} className={`chat-message ${message.senderName === 'Me' ? 'right' : 'left'}`}>
            <div className="chat-message-text">{message.text}</div>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
