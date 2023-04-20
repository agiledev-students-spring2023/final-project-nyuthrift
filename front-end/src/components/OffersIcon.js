import '../styles/OffersIcon.css';
import axios from 'axios';

const OffersIcon = ({productName, listedPrice, offerPrice, date, imageUrl, id}) => {
    const handleAcceptClick = () => {
        const data = {bool: 'true', id: id}; 

        axios.post('http://localhost:3000/api/myoffers', data)
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
    };

    const handleDeclineClick = () => {
        const data = {bool: 'false', id: id}; 

        axios.post('http://localhost:3000/api/myoffers', data)
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
    };


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
                    <div className='accept' onClick={handleAcceptClick}>Accept</div>
                    <div className='decline' onClick={handleDeclineClick}>Decline</div>
                </div>
                <div className='date'>{date}</div>
            </div>

        </div>

        
        



    );
};

export default OffersIcon;