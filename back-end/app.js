const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Define a route for getting mock data
app.get('/api/products', async (req, res) => {
  try {
    // Make a request to Mockaroo API to get mock product data
    const response = await axios.get('https://api.mockaroo.com/api/generate.json?key=ab260320&schema=product&count=3');
    const mockData = response.data;

    // Build response compatible with the given structure
    const products = mockData.map((data, index) => ({
      id: index + 1,
      name: data.product_name,
      category: data.product_category,
      price: data.product_price,
    
    }));

    // Send the response as JSON
    res.json(products);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.get('/api/myprofile', async(req, res) => {
try {
    const response = await axios.get('https://api.mockaroo.com/api/generate.json?key=ab260320&schema=MyProfile&count=1');
    const mockData = response.data;

    res.json(mockData);
}

catch (error) {
  // Handle errors
  console.error(error);
  res.status(500).send('Internal server error');
}

});



// Listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
