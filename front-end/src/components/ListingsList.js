import ListingsIcon from "./ListingsIcon";
import '../styles/OffersList.css';

const ListingsList = ({listings}) => {

  const sortedListings = listings.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

    return (
      <div className="offer-list-container">
        <div className="offer-list">
          {sortedListings.map((listing, index) => {
            return (
              <ListingsIcon
              key={index} 
              id={listing.user.id}
              productName={listing.title} 
              listedPrice ={listing.price}
              listingId = {listing._id}
              date = {listing.createdAt}
              imageUrl={`${process.env.REACT_APP_UPLOADS_URL}/${listing.images[0]}`} 
              />
            )
          })}
        </div>
      </div>
    );
  }

  export default ListingsList;
