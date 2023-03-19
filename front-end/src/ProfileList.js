import React from 'react';
import Profile from './ProfileIcon'

const ProfileList = ({profiles}) => {
    return (
        <div>
            {profiles.map(profile => (
                <Profile imageUrl={profile.imageUrl} name={profile.name} profileUrl={profile.profileUrl} />

            ))}
        </div>
    );
};

export default ProfileList; 