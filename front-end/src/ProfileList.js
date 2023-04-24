import React from 'react';
import { Link } from 'react-router-dom';

const ProfileList = ({ conversations, currentUserId }) => {
  return (
    <div>
      {conversations && Array.isArray(conversations) ? (
        conversations.map((conversation) => {
          const otherUser = conversation.users.find(user => user._id !== currentUserId);
          return (
            <div key={conversation._id}>
              <Link to={`/chat/${otherUser._id}`}>
                <h4>{otherUser.username}: </h4>
                <p>{conversation.messages[conversation.messages.length - 1].content}</p>
              </Link>
            </div>
          );
        })
      ) : (
        <p style={{color: "black"}}>No Conversations Yet...</p>
      )}
    </div>
  );
};

export default ProfileList;
