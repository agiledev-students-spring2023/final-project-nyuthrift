import OffersIcon from "./components/OffersIcon";
import OffersList from "./components/OfferList";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MyOffers = () =>{
    const [offers, setOffers] = useState([]);
    
    useEffect(() => {
        const fetchOffers = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/myoffers');
            setOffers(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchOffers();
      }, []);

      const handleDelete = (deletedId) => {
        const updatedOffers = offers.filter((offers) => offers._id != deletedId)
        setOffers(updatedOffers)
      } 
    return(
           
          
        <OffersList offers = {offers}  handleDelete = {handleDelete} />
        


    );
};

export default MyOffers