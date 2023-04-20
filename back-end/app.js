const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');



const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

//connect to mongodb server
try {
  //connects to userdata
  mongoose.connect(process.env.MONGODB_URL)
  console.log(`Connected to MongoDB.`)
} catch (err) {
  console.log(
    `Error connecting to MongoDB user account authentication will fail: ${err}`
  )
}


const authRoutes = require('./routes/auth-routes');
app.use(authRoutes);

const cookieRoutes = require('./routes/cookie-routes');
app.use(cookieRoutes);

let products = [];

let myOffers = [
  { id: 0 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200',}, 
  { id: 1 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/19/23', imageUrl:'https://via.placeholder.com/200' },
  { id: 2 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/10/23', imageUrl:'https://via.placeholder.com/200'},
];

let myListings = [
  { id: 0 , productName: 'test', listedPrice: '42', offerPrice: '40', date: 'today', imageUrl:'https://via.placeholder.com/200'}, 
  { id: 1 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/19/23', imageUrl:'https://via.placeholder.com/200' },
  { id: 2 , productName: 'test', listedPrice: '42', offerPrice: '40', date: '3/10/23', imageUrl:'https://via.placeholder.com/200'},
];

// Enable CORS


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
    products = mockData.map((data, index) => ({
      id: index + 1,
      name: data.product_name,
      category: data.product_category,
      price: data.product_price,
      description: `This is a ${data.product_name}. Buy it!`,
    }));

    // Send the response as JSON
    res.json(products);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


//creating new listing from Sell Route
app.post('/api/products', async(req, res) => {
  try{
    const name = req.body.title; 
    const { category, price, description } = req.body; 
    const id = products.length + 1; 
    const newProduct = {
      id,
      name,
      category,
      price,
      description,
    };

    products.push(newProduct);
    res.json(newProduct)
  } catch(err){
    console.log(`Error: ${err}`)
  }
})

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find((p) => p.id == productId);

  if(product){
    res.json(product)
  } else{
    res.status(404).send('Product not found');
  }

})




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


const listings = {}; // using this to store new listings (for now)
let currentId = 1; // Variable to generate new listing IDs

app.post('/sell', upload.array('images'), (req, res) => {
    //images stored in 'uploads' folder within backend
    const { title, price, description, condition, category } = req.body;
    const images = req.files.map((file) => file.filename);
    const newListing = {
        id: currentId,
        title,
        price,
        description,
        condition,
        category,
    };

    //store new listing in array 
    listings[currentId] = newListing;

    // Increment the currentId 
    currentId++;
    res.json({id: newListing.id, message: 'Listing created successfully'})
    //res.send('Listing created successfully');
})




// app.get('/product-listing/:id', (req, res) => {
//     const { id } = req.params;
  
//     // Check if the listing with the given ID exists
//     if (listings.hasOwnProperty(id)) {
//       // Return the listing data
//       res.json(listings[id]);
//     } else {
//       // Return a 404 error if the listing does not exist
//       res.status(404).send('Listing not found');
//     }
// });


app.get('/product-listing/:id', (req, res) => {
    const listingId = req.params.id;
    const listing = listings[listingId];
  
    if (listing) {
      res.json(listing);
    } else {
      res.status(404).send('Listing not found');
    }
});

app.get('/api/myoffers', (req, res) => {

  res.json(myOffers);

});

app.post('/api/myoffers', (req, res) => {
  // Add the new data to the array
  
  if(req.body.bool === 'false') {
    return;
  }

  if(req.body.bool === 'true') {
    return;
  }


  req.body.id = myOffers.length;
  myOffers.push(req.body);
});



app.get('/api/mylistings', (req, res) => {

  res.json(myOffers);

});

app.post('/api/mylistings', (req, res) => {
  // Add the new data to the array
  
  if(req.body.bool === 'false') {
    return;
  }

  if(req.body.bool === 'true') {
    return;
  }


  req.body.id = myListings.length;
  myOffers.push(req.body);
});


app.get('/api/getMessages', (req, res) => {
  const name = "John Doe"; 
  console.log(name)
  const results = [];
  const selected = [];
  const maxResults = 15;
  fs.createReadStream('mockeroo_messages.csv')
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      while (selected.length < maxResults && results.length > 0) {
        const index = Math.floor(Math.random() * results.length);
        if (Math.floor((Math.random() * 11)) > 5){
          results[index]["senderName"] = name
        }
        else {
          results[index]["senderName"] = "me"
        }
        selected.push(results[index]);
        results.splice(index, 1);
      }
      res.json(selected);
    });
});
    

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;