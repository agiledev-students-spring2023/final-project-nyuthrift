import OffersIcon from "./OffersIcon";
import OffersList from "./OfferList";
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
    return(
           
          
        <OffersList offers = {offers} />
        


    );
};

export default MyOffers