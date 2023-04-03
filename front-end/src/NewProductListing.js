import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

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

    const { id } = useParams();
    console.log("Listing ID:", id);
    const [data, setData] = useState(null);
    const [liked, setLiked] = useState(false);
    const [offerDialogOpen, setOfferDialogOpen] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Fetch data for the listing with the given ID from the server
        // Replace this with your actual API call
        axios.get(`http://localhost:3000/product-listing/${id}`)
        .then((res) => {
            setData(res.data);
            console.log(data);
        })
        .catch((err) => {
            console.error("Error:",err);
        });
    }, [id]);

    // Render a loading message while the data is being fetched
    if (!data) {
        return <div>Loading...</div>;
    }
 

  const images = [
    'https://picsum.photos/200?random=1',
    'https://picsum.photos/200?random=2',
    'https://picsum.photos/200?random=3',
  ];

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleOfferDialogClose = () => {
    setOfferDialogOpen(false);
  };

  const handleOfferDialogOpen = () => {
    setOfferDialogOpen(true);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={images[step]}
              alt="Product"
              style={{ width: '100%', maxWidth: '300px' }}
            />
          </Box>
          <MobileStepper
            variant="dots"
            steps={3}
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
          <Typography variant="h5">{data.title}(Condition: {data.condition})</Typography>
          <Typography variant="body1">
          {data.description}
          </Typography>
          <Typography variant="h6">${data.price}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton onClick={handleLikeClick} sx={{ marginRight: 1 }}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
              Buy
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOfferDialogOpen}
              sx={{ marginRight: 1 }}
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
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleOfferDialogClose}>Cancel</Button>
                <Button onClick={handleOfferDialogClose}>Submit Offer</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="secondary">
              Contact Seller
            </Button>
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Listed by: Seller Name
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewProductListing;