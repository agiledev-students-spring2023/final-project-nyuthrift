import React from 'react'
import './ProfileIcons.css'
import {Link} from 'react-router-dom'

const Profile = ({imageUrl, name, profileUrl}) => {
    return (
        <Link to = {profileUrl} className="link" >
             <div className="profile">
                <img className = "profile-image" src={imageUrl} alt="profile"/>
                <div className = "profile-name">{name}</div>
            </div>
        </Link>
       

    );
};

export default Profile;