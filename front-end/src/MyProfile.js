import Button from "./components/Button";
import './styles/MyProfile.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(''); 
  const [imageUrl, setImageUrl] = useState('');


  const navigate = useNavigate();

  const handleClick = async () => {

    try {
      axios.get('http://localhost:3000/logout')
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
        const response = await axios.get('http://localhost:3000/api/myprofile');
        setName(response.data.name); 
        setAddress(response.data.address);
        setPhone(response.data.phone_number);
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
        <div className="button-info">
          <Button
            to="/"
            className="myButton"
            text={address}
          />

          <Button
            to="/"
            className="myButton"
            text={phone}
          />

          <Button
            to="/"
            className="myButton"
            text="Payment Information"
          />

          <button
            className="myButton" onClick={handleClick}
          >
            Logout
          </button>
        </div>

        <div className="button-you">
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
      </div>
    </div>
  );
}


export default MyProfile;
