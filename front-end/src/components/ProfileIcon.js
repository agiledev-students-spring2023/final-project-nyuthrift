import React from 'react'
import '../styles/ProfileIcons.css'
import {Link} from 'react-router-dom'

const ProfileIcon = ({imageUrl, name, profileUrl}) => {
    return (
        <Link to = {profileUrl} className="link" >
             <div className="profiles">
                <img className = "profile-image" src={imageUrl} alt="profile"/>
                <div className = "profile-name">{name}</div>
            </div>
        </Link>
       

    );
};

export default ProfileIcon;