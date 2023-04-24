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

const ProfileList = ({ profiles, messages }) => {
  if (profiles) {
    return (
      <div className="profile-list">
        {profiles.map((profile) => (
          <ProfileItem key={profile.profileUrl} profile={profile} />
        ))}
      </div>
    );
  } else if (messages) {
    return (
      <div className="message-list">
        {messages.map((message) => (
          <MessageItem key={message._id} message={message} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileList;
