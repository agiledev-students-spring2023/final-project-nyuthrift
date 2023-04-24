import { useNavigate } from 'react-router-dom';
import './Conversations.css';
import React from 'react';

const Conversations = ({ conversations = [] }) => {
  const navigate = useNavigate();

  const handleClick = (conversationId) => {
    navigate(`/chat/${conversationId}`);
  };

  return (
    <div className="Conversations">
      {conversations.map((conversation) => (
        <div
          key={conversation._id}
          className="conversation"
          onClick={() => handleClick(conversation._id)}
        >
          {conversation.users.map((user) => user.username).join(', ')}
        </div>
      ))}
    </div>
  );
};

export default Conversations;
