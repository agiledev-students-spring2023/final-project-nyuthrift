import Button from "./components/Button";
import './styles/MyProfile.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const navigate = useNavigate();

  const handleClick = async () => {

    try {
      axios.get(`${process.env.REACT_APP_API_URL}/api/logout`)
      .then(response => {
        navigate('/signin'); 
      })
  } catch(err) {
      console.log(err);
  }

  }

  useEffect(() => {
    const fetchuserinfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/myprofile`);
        setName(response.data.name); 
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    fetchuserinfo();
  }, []);

  return (
    <div className="myprofile">
      <div className="profile-header">
        <img className="profile-pic" src={imageUrl} alt="profile"/>
        <h2>{name}</h2>
      </div>

      <div className="button-group">
          <Button
            to="/purchasehistory"
            className="myButton"
            text="Past Purchases"
          />
          <Button
            to="/mylistings"
            className="myButton"
            text="Your Listings"
          />
          <Button
            to="/messages"
            className="myButton"
            text="Your Messages"
          />

          <Button
            to="/myoffers"
            className="myButton"
            text="Your Offers"
          />
        </div>

      <div className="button-you">
        <div className="button-info">
      
          <button
            className="myButton" onClick={handleClick}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}


export default MyProfile;
