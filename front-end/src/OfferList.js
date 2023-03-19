import OffersIcon from "./OffersIcon";

const OffersList = ({offers}) => {
    return (
      <div className="offer-list-container">
        <div className="offer-list">
          {offers.map((offer, index) => (
            <OffersIcon
            key={index} 
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

  export default OffersList;