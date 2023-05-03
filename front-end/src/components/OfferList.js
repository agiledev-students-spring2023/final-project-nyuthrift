import OffersIcon from "./OffersIcon";
import '../styles/OffersList.css';


const OffersList = ({offers, handleDelete}) => {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
  
    return `${month}/${day}/${year}`;
  }

  const modifiedOffers = offers.map((offer) => {

    const productName = offer.listingName;
    const listedPrice = offer.listedPrice;
    const offerPrice = offer.offerPrice;
    const date = formatDate(offer.createdAt);
    const imageUrl = `${process.env.REACT_APP_UPLOADS_URL}/${offer.listingImage[0]}`
    const id = offer._id;
    const seller_id = offer.buyer.id;
    
    return {
      productName,
      listedPrice,
      offerPrice,
      date,
      imageUrl,
      id,
      seller_id
    };
  });
    return (
      <div className="offer-list-container">
        <div className="offer-list">
          {modifiedOffers.map((offer, index) => (
            <OffersIcon
            key={index} 
            id={offer.id}
            productName={offer.productName} 
            listedPrice ={offer.listedPrice}
            offerPrice ={offer.offerPrice}
            date = {offer.date}
            imageUrl={offer.imageUrl} 
            seller_id = {offer.seller_id}
            onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }

  export default OffersList;