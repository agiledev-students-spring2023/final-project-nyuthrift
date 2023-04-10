
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

//import logo from './logo.svg';

//import Login from './Login'
import SearchBar from './search_bar';
import Navbar from './navBar'

import './App.css';
import Login from './Login'
import Home from './Home'
import MyProfile from "./MyProfile";
import ProductPage from "./ProductPage/ProductPage";
import Chat from './chat/Chat'
import Signup from "./Signup";
import Signin from "./Signin"
import Messages from "./Messages"
import MyOffers from "./MyOffers";
import Sell from "./Sell"
import Profile from "./Profile";
import MyListings from "./MyListings";
import MyLikes from "./MyLikes"
import PurchaseHistory from "./PurchaseHistory";
import ShopAllPage from "./ShopAll";
import ProductListing from "./ProductListing";

import NewProductListing from "./NewProductListing";

let mockProd = [
  { id: 1, name: 'Laptop', category: 'Tech', price: 899 },
  { id: 2, name: 'Book', category: 'Books', price: 15 },
  { id: 3, name: 'Shirt', category: 'Clothing', price: 25 },
];

function App() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

 
  return (
    
    <div className="App">
      
      <Router>
        <Navbar />
        <main className="App-main">

        <Routes>
   
        {products.map((product) => (
  <Route key={product.id} path={`/products/${product.id}`} element={<ProductListing name={product.name} price={product.price} description={`This is a ${product.name}. Buy it!`} />} />
))}


            {/* a route for the home page */}
            {/* <Route path="/" element={<Home />} /> */}

            {/* <Route path="/products/:id" element={<NewProductListing />} /> */}
            {/* a route for the Login page */}
            
            <Route path="/product-listing/:id" element={<NewProductListing />} />
            {/* a route for the Home page */}
            <Route path="/home" element={<ShopAllPage />} />

            {/* a route for the Product page */}
            <Route path="/product" element={<ProductPage />} />
                
            <Route path="/productlisting" element={<ProductListing/>} />
            {/* a route for the Login page */}

            <Route path="/" element={<ShopAllPage />} />
            
            <Route path="/profile" element={<Profile />} />
           
            
            <Route path="/myoffers" element={<MyOffers />}/>
            <Route path="/all" element={<ShopAllPage products={mockProd} />}/>

            <Route path="/mylistings" element={<MyListings />}/>
            <Route path="/myLikes" element={<MyLikes />}/>

            <Route path="/chat" element = {<Chat contact_name={"other user"}/>} />

            <Route path="/signup" element={<Signup/>} />

            
            <Route path="/signin" element={<Signin />} />
            
            <Route path="/messages" element={<Messages />}/>
            <Route path="/myprofile" element={<MyProfile />}/>
            <Route path="/sell" element={<Sell />}/>
            <Route path="/PurchaseHistory" element={<PurchaseHistory />}/>
          </Routes>
        </main>
       
      </Router>
    </div>
  );
}

export default App;