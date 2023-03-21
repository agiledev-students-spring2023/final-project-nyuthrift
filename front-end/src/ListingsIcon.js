import './ListingsIcon.css';


const ListingsIcon = ({productName, listedPrice, offerPrice, date, imageUrl}) => {
    return(

        <div className='offers-icon'>
            <img className='offers-image' src = {imageUrl} />
          
            <div className='offers-row'>
                <div className='product-name'>{productName}</div>
                <div className='listed-price'>Listed Price: {listedPrice}</div>
                <div className='offer-price'>Highest Offer: {offerPrice}</div>

            </div>
            <div className='offers-row2'>
                <div className='buttons'>
                    <div className='accept'>View Listing</div>
                    <div className='decline'>Delete Listing</div>
                </div>
                <div className='date'>Listed on: {date}</div>
            </div>

        </div>

        
        



    );
};

export default ListingsIcon;