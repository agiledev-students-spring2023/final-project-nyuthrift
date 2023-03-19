import './OffersIcon.css';


const OffersIcon = ({productName, listedPrice, offerPrice, date, imageUrl}) => {
    return(

        <div className='offers-icon'>
            <img className='offers-image' src = {imageUrl} />
          
            <div className='offers-row'>
                <div className='product-name'>{productName}</div>
                <div className='listed-price'>Listed Price: {listedPrice}</div>
                <div className='offer-price'>Offer Price: {offerPrice}</div>

            </div>
            <div className='offers-row2'>
                <div className='buttons'>
                    <div className='accept'>Accept</div>
                    <div className='decline'>Decline</div>
                </div>
                <div className='date'>{date}</div>
            </div>

        </div>

        
        



    );
};

export default OffersIcon;