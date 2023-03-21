import React from "react";
import OffersIcon from "./OffersIcon";
import ListingsList from "./ListingsList";

const MyListings = () =>{
    const profiles = [
        { key: 1 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200'}, 
        { key: 2 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/19/23', imageUrl:'https://via.placeholder.com/200' },
        { key: 3 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/10/23', imageUrl:'https://via.placeholder.com/200'},
        { key: 4 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/7/23', imageUrl:'https://via.placeholder.com/200' },
        { key: 5 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/3/23', imageUrl:'https://via.placeholder.com/200' }
    ];
    return(
           
          
        <ListingsList offers = {profiles} />
        
            
    

    );
};

export default MyListings