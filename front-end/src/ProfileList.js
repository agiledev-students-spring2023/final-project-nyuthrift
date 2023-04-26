import React from 'react';
import Conversations from './chat/Conversations';

const ProfileList = ({ conversations, userId }) => {
  console.log('ProfileList User Id: ', userId);

  return (
    <div>
      {conversations.length ? (
        <Conversations conversations={conversations} currentUserId={userId} />
      ) : (
        <p style={{color: "black"}}>No Conversations Yet...</p>
      )}
    </div>
  );
};

export default ProfileList;
