const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;



const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data




// Enable CORS
app.use(cors());

//setting up Multer middleware (for file uploads)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


// Define a route for getting mock data
app.get('/api/products', async (req, res) => {
  try {
    // Make a request to Mockaroo API to get mock product data
    const response = await axios.get('https://cdn.discordapp.com/attachments/593187505403199490/1092272815455084606/product.json');
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
    const response = await axios.get('https://cdn.discordapp.com/attachments/593187505403199490/1092275234788364318/MyProfile.json');
    const randomIndex = Math.floor(Math.random() * response.data.length);

    const mockData = response.data[randomIndex];

    res.json(mockData);
}

catch (error) {
  // Handle errors
  console.error(error);
  res.status(500).send('Internal server error');
}

});

app.post('/sell', upload.array('images'), (req, res) => {
    //images stored in 'uploads' folder within backend
    const { title, price, description, condition, category } = req.body;
    const images = req.files.map((file) => file.filename);
    res.send('Listing created successfully');
})


// Listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
