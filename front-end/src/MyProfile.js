import React from "react";
import Button from "./Button";
import './MyProfile.css';


const MyProfile = () => {
    return (
        <div className="myprofile">

            <img className="image" src="https://via.placeholder.com/200" />
            

                <div className="button-info">
                    <p className="name">John Doe</p>

                    <Button
                            to = "/"
                            className = "myButton"
                            text = "Address"
                        />
                    <Button
                            to = "/"
                            className = "myButton"
                            text = "Payment Information"
                        />
                    <Button
                            to = "/"
                            className = "myButton"
                            text = "Phone Number"
                        />
                    <Button
                            to = "/"
                            className = "myButton"
                            text = "View All"
                        />

                </div>

                <div className="button-you">
                    <Button
                            to = "/purchasehistory"
                            className = "myButton"
                            text = "Past Purchases"
                        />
                    <Button
                            to = "/mylistings"
                            className = "myButton"
                            text = "Your Listings"
                        />
                    <Button
                            to = "/messages"
                            className = "myButton"
                            text = "Your Messages"
                        />
                    <Button
                            to = "/"
                            className = "myButton"
                            text = "Your Likes"
                        />
                     <Button
                            to = "/myoffers"
                            className = "myButton"
                            text = "Your Offers"
                        />


                </div>
        </div>
     
       
  
    );
};

export default MyProfile;