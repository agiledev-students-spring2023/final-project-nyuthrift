import React, { useState } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  Paper,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  imageWrapper: {
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    background: "rgba(255, 255, 255, 0.7)",
  },
}));

const Sell = ({ onNewListing }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newListingId, setNewListingId] = useState(null);

  const handleImageUpload = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // SUBMIT THE FORM DATA TO API/SERVER BACKEND HERE
    const formData = new FormData(); 
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('condition', condition);
    formData.append('category', category);
    for(let i = 0; i < images.length; i++){
      formData.append('images', images[i]);
    }
    axios.post('http://localhost:3000/sell', formData)
      .then((res)=>{
        //clearing form inputs
        setOpenSnackbar(true);
        setTitle('');
        setPrice('');
        setDescription('');
        setCondition('');
        setCategory('');
        setImages([]);
        console.log(res.data)
        setNewListingId(res.data.id)
      })
      .catch((err)=>{
        console.log(err);
      })
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        List an Item for Sale
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.formControl}
          label="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          className={classes.formControl}
          label="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          className={classes.formControl}
          label="Product Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="product-category-label">Product Category</InputLabel>
          <Select
            labelId="product-category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Textbooks">Textbooks</MenuItem>
            <MenuItem value="Appliances">Appliances</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Misc">Misc</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="product-condition-label">Product Condition</InputLabel>
          <Select
            labelId="product-condition-label"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Like New">Barely Used</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
            <MenuItem value="Fair">Fair</MenuItem>
            <MenuItem value="Poor">Poor</MenuItem>
          </Select>
        </FormControl>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleImageUpload}
        />
        <Box mt={2} display="flex" justifyContent="center">
          {newListingId && !openSnackbar && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/product-listing/${newListingId}`)}
            >
              View your new listing here
            </Button>
          )}
        </Box>
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.uploadButton}
          >
            Upload Images
          </Button>
        </label>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          {images.map((image, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Paper className={classes.imageWrapper}>
                <IconButton
                  className={classes.deleteButton}
                  onClick={() => handleImageRemove(index)}
                >
                  <DeleteIcon />
                </IconButton>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box mt={3} display="flex" justifyContent="center">
          <Button variant="contained" color="secondary" type="submit">
            List Item
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Item listed successfully!"
        />
        

      
      </form>
    </Container>
  );
};

export default Sell;
