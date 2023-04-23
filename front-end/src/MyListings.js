import ListingsList from "./components/ListingsList";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const MyListings = () =>{
    const [listings, setListings] = useState([]);
    useEffect(() => {
        const fetchListings = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/mylistings');
            setListings(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchListings();
      }, []);
    return(
           
          
        <ListingsList listings = {listings} />
        
            
    

    );
};

export default MyListings