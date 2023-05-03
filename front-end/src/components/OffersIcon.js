import '../styles/OffersIcon.css';
import axios from 'axios';

const OffersIcon = ({productName, listedPrice, offerPrice, date, imageUrl, id, onDelete, seller_id}) => {
    const handleAcceptClick = async () => {
      try {
        const convo = await axios.post(`${process.env.REACT_APP_API_URL}/api/new_conversation`, {
          userId: seller_id // replace with thfide actual ID of the seller
        });
  
       
        const message = "Hello I accept your offer of $" + offerPrice + " for my " + productName;
        const getmyuserid = await fetch(`${process.env.REACT_APP_API_URL}/api/current-user`, {
          credentials: 'include',
        });
        const currUser = await getmyuserid.json();
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/${convo.data._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: message, user_id: currUser.id,
          }),
  
        })

        alert("Message sent successfully: Please visit Messages to contact the buyer.");
      }
      catch (error) {
        console.error('Error creating conversation:', error);
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/delete-offers`, {id})
        //deletes the listing after accepting
        onDelete(id);
    };

    const handleDeclineClick = async event => {
        
    const confirmDelete = window.confirm('Are you sure you want to decline this offer?');
    if(confirmDelete) {
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/delete-offers`, {id})
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