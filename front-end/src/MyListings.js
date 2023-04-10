import ListingsList from "./ListingsList";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const MyListings = () =>{
    const [listings, setListings] = useState([]);
    useEffect(() => {
        const fetchOffers = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/mylistings');
            setListings(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchOffers();
      }, []);
    return(
           
          
        <ListingsList offers = {listings} />
        
            
    

    );
};

export default MyListings