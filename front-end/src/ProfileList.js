import React from 'react';
import ProfileIcon from './ProfileIcon'

const ProfileList = ({profiles}) => {
    return (
        <div>
            {profiles.map(profile => (
                <ProfileIcon imageUrl={profile.imageUrl} name={profile.name} profileUrl={profile.profileUrl} />

            ))}
        </div>
    );
};

export default ProfileList; 