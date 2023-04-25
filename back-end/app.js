const mongoose = require('mongoose');
const User = require('./models/user'); // Assuming the user model is in the 'models' folder
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use('/uploads', express.static('uploads'));
const Message = require('./models/messages.js')

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

//Importing Routes 
const authRoutes = require('./routes/auth-routes');
app.use(authRoutes);

const cookieRoutes = require('./routes/cookie-routes');
app.use(cookieRoutes);

const createListingRouter = require('./routes/create-listing')
app.use(createListingRouter);

const createMiscRoutes = require('./routes/misc-routes')
app.use(createMiscRoutes);

const conversationRouts = require('./routes/conversation-routes');
app.use(conversationRouts);

// middlewear: 
const decodeJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send("missing token");
  }
  jwt.verify(token, process.env.SECRET_STRING, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.status(401).send("Invalid token");
    }
    req.decodedToken = decodedToken;
    next();
  });
};




app.get('/authenticate', (req, res) => {
  const token = req.cookies.jwt;
  if(!token) {
    return res.status(401).send('missing token');
  }
  jwt.verify(token, process.env.SECRET_STRING, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.status(401).send('Invalid token');
    }

    return res.send('Authentication successful');
  });
});


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


/*
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
*/




app.get('/api/myoffers', (req, res) => {

  res.json(myOffers);

});

app.post('/api/myoffers', (req, res) => {
  if(req.body.bool === 'false') {
    return;
  }
  if(req.body.bool === 'true') {
    return;
  }
  req.body.id = myOffers.length;
  myOffers.push(req.body);
});

app.post("/api/sendMessage", decodeJWT, async (req, res) => {
  try {
    const { content, recipient } = req.body;
    const sender = req.decodedToken.id; // Get the sender's ID from the decoded JWT

    // Find the recipient's ID using their name
    const recipientUser = await User.findOne({ username: recipient });

    if (!recipientUser) {
      res.status(404).json({ message: "Recipient not found" });
      return;
    }

    const recipientId = recipientUser._id;

    const message = new Message({
      content,
      sender,
      recipient: recipientId,
      createdAt: new Date(),
    });
    await message.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;