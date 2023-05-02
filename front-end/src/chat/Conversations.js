import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatWindow from './chatwindow';
import './Conversations.css';

const Conversations = ({ conversations = [], currentUserId }) => {
  const navigate = useNavigate();
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const handleClick = (conversationId) => {
    setSelectedConversationId(conversationId);
    navigate(`/chat/${conversationId}`, { state: { conversationId } });
  };
  
  

  return (
    <div className="Conversations">
      <div className="Conversations-list">
        {conversations.map((conversation) => {
          const otherUser = conversation.users.find((user) => user._id != currentUserId);
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          return (
            <div
              key={conversation._id}
              className="conversation"
              onClick={() => handleClick(conversation._id)}
            >
              <h4>{otherUser.username}:</h4>
              {lastMessage && <p>{lastMessage.content}</p>}
            </div>
          );
        })}
      </div>
     
    </div>
  );
};

export default Conversations;
