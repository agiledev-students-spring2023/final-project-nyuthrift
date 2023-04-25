import '../styles/OffersIcon.css';
import axios from 'axios';

const OffersIcon = ({productName, listedPrice, offerPrice, date, imageUrl, id, onDelete}) => {
    const handleAcceptClick = () => {


        //deletes the listing after accepting
        onDelete(id);
    };

    const handleDeclineClick = async event => {
        
    const confirmDelete = window.confirm('Are you sure you want to decline this offer?');
    if(confirmDelete) {
      try{
        const response = await axios.post('http://localhost:3000/api/delete-offers', {id})
        if(response.status === 200) {
          console.log('Deleted Listing ')
          onDelete(id);
        }
      } catch(error){
        console.log("error deleting listing", error);
      }
    }
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