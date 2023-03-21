import React from "react";
import Button from "./Button";
import './Profile.css';


const Profile = () => {
    return (
        <div className="generic-profile">

            <img className="image" src="https://via.placeholder.com/200" />
            

                <div className="generic-profile-buttons">
                    <p className="generic-name">John Doe</p>

                    <Button
                            to = "/"
                            className = "myButton"
                            text = "My Offers"
                        />
                     <Button
                            to = "/"
                            className = "myButton"
                            text = "Message User"
                        />

                </div>
        </div>
     
       
  
    );
};

export default Profile;