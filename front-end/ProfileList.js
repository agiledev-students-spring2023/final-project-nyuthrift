import React from 'react';

const ProfileItem = ({ profile }) => {
  return (
    <div className="profile-item">
      <img src={profile.imageUrl} alt={profile.name} />
      <h4>{profile.name}</h4>
    </div>
  );
};

const MessageItem = ({ message }) => {
  return (
    <div className="message-item">
      <p>{message.content}</p>
    </div>
  );
};



const ProfileList = ({ messages }) => {
    console.log("ProfileList messages:", messages);
    return (
      <div>
        {Array.isArray(messages) ? (
          messages.map((message) => (
            <div key={message._id}>
              <h4>{message.sender.username}: </h4>
              <p>{message.content}</p>
            </div>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
      </div>
    );
  };
  

  
export default ProfileList;
