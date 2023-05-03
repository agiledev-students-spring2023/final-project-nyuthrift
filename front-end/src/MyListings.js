import ListingsList from "./components/ListingsList";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const MyListings = () =>{
    const [listings, setListings] = useState([]);
    useEffect(() => {
        const fetchListings = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mylistings`);
            setListings(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchListings();
      }, []);

    const handleDelete = (deletedId) => {
      const updatedListings = listings.filter((listing) => listing._id != deletedId)
      setListings(updatedListings)
    } 
      
    return(
           
          
        <ListingsList listings = {listings} handleDelete = {handleDelete} />
        
            
    

    );
};

export default MyListings