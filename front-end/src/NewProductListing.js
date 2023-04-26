import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MobileStepper,
  Grid,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NewProductListing = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    //console.log("Listing ID:", id);
    const [data, setData] = useState(null);
    const [liked, setLiked] = useState(false);
    const [offerDialogOpen, setOfferDialogOpen] = useState(false);
    const [buyDialogOpen, setBuyDialogOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [offerPrice, setOfferPrice] = useState('');
    useEffect(() => {
        // Fetch data for the listing with the given ID from the server
        // Replace this with your actual API call
        axios.get(`http://localhost:3000/api/products/${id}`)
        .then((res) => {
            setData(res.data);
            //console.log(data);
        })
        .catch((err) => {
            console.error("Error:",err);
        });
    }, [id]);

    // Render a loading message while the data is being fetched
    if (!data) {
        return <div>Loading...</div>;
    }
 

  const images = data.images; 

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleOfferPriceChange = (event) => {
    setOfferPrice(event.target.value);
  };
  const handleOfferDialogClose = async event => {
    setOfferDialogOpen(false);
    const listedPrice = data.price;
    const seller = data.user;
    const listingName = data.title; 
    const listingImage = data.images;
    const payload = {seller, offerPrice, listedPrice, id, listingName, listingImage };
    try{
      const response = await axios.post('http://localhost:3000/api/create-offers', payload)
    }
    catch(err) {
      console.log(err);
    }
  };

  const handleOfferDialogOpen = () => {
    setOfferDialogOpen(true);
  };

  const handleBuyDialogClose = () => {
    setBuyDialogOpen(false);
  };

  const handleBuyDialogOpen = () => {

    setBuyDialogOpen(true);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };
  
  const handleContactSellerClick = async () => {
    console.log(data)

    try {
        const response = await axios.post('http://localhost:3000/api/new_conversation', {
        userId: data.user.id, // replace with the actual ID of the seller
      });
      console.log(response)
      let id = response.data._id
      let user = data._id
      navigate(`/chat/${id}`, { state: { user } });
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
   
  };
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
  
    return `${month}/${day}/${year}`;
  }

  const publicUrl = process.env.REACT_APP_UPLOADS_URL || 'http://localhost:3000/uploads/'; //folder in backend with multer image uploads 

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Box sx={{ mt: 2, px: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            {data.title} (Condition: {data.condition})
          </Typography>
         
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img
              src={`${publicUrl}/${images[step]}`}
              alt="Product"
              style={{ width: '100%', maxWidth: '300px' }}
            />
          </Box>

          <MobileStepper
            variant="dots"
            steps={images.length}
            position="static"
            activeStep={step}
            nextButton={
              <IconButton
                size="small"
                onClick={handleNext}
                disabled={step === images.length - 1}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            }
            backButton={
              <IconButton
                size="small"
                onClick={handleBack}
                disabled={step === 0}
              >
                <ArrowBackIosIcon />
              </IconButton>
            }
          />

           <Typography variant="h6" sx={{ mb: 1 }}>Price: ${data.price}</Typography>
           
           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {data.description}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} onClick={handleBuyDialogOpen}>
              Buy
            </Button>
            <Dialog
              open={buyDialogOpen}
              onClose={handleBuyDialogClose}
              aria-labelledby="buy-dialog-title"
            >
              <DialogTitle id="buy-dialog-title">Buy</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter your preferred method of payment and preferred meetup location.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="payment"
                  label="Payment Method (Cash, Venmo, PayPal, Zelle, etc.)"
                  type="text"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  id="location"
                  label="Meetup Location"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleBuyDialogClose}>Cancel</Button>
                <Button onClick={handleBuyDialogClose}>Confirm</Button>
              </DialogActions>
            </Dialog>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleOfferDialogOpen}
              sx={{ mb: 1 }}
            >
              Make an Offer
            </Button>
            <Dialog
              open={offerDialogOpen}
              onClose={handleOfferDialogClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Make an Offer</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter your offer price for this product.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="offer"
                  label="Offer Price"
                  type="number"
                  fullWidth
                  value={offerPrice}
                  onChange={handleOfferPriceChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleOfferDialogClose}>Cancel</Button>
                <Button onClick={handleOfferDialogClose}>Submit Offer</Button>
              </DialogActions>
            </Dialog>
            <Button onClick={handleContactSellerClick} variant="outlined" color="secondary" fullWidth>
              Contact Seller
            </Button>
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Listed by: {data.user.name} on {formatDate(data.createdAt)}
          </Typography>
          
        </Box>
      </Grid>
    </Grid>
  );
  
};

export default NewProductListing;