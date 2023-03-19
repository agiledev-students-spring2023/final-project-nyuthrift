import React from "react";
import OffersIcon from "./OffersIcon";
import OffersList from "./OfferList";

const MyOffers = () =>{
    const profiles = [
        { key: 1 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200'}, 
        { key: 2 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200' },
        { key: 3 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200'},
        { key: 4 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200' },
        { key: 5 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200' }
    ];
    return(
           
          
        <OffersList offers = {profiles} />
        
            
    

    );
};

export default MyOffers