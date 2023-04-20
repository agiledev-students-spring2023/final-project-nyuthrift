import ListingsIcon from "./ListingsIcon";
import '../styles/OffersList.css';

const ListingsList = ({offers}) => {
    return (
      <div className="offer-list-container">
        <div className="offer-list">
          {offers.map((offer, index) => (
            <ListingsIcon
            key={index} 
            id={offers.id}
            productName={offer.productName} 
            listedPrice ={offer.listedPrice}
            offerPrice ={offer.offerPrice}
            date = {offer.date}
            imageUrl={offer.imageUrl} 
            />
          ))}
        </div>
      </div>
    );
  }

  export default ListingsList;