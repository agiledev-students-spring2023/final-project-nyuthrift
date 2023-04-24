import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from 'axios';
import Conversations from './chat/Conversations';
import ChatWindow from './chat/chatwindow';

import SearchBar from './components/search_bar';
import Navbar from './components/navBar'

import './styles/App.css';
import Login from './Login'
import Home from './Home'
import MyProfile from "./MyProfile";

import Signup from "./Signup";
import Signin from "./Signin"
import Messages from "./Messages"
import MyOffers from "./MyOffers";
import Sell from "./Sell"
import MyListings from "./MyListings";
import MyLikes from "./MyLikes"
import PurchaseHistory from "./PurchaseHistory";
import ShopAllPage from "./ShopAll";
import ProtectedRoute from './components/Protected'
import NewProductListing from "./components/NewProductListing";

let mockProd = [
  { id: 1, name: 'Laptop', category: 'Tech', price: 899 },
  { id: 2, name: 'Book', category: 'Books', price: 15 },
  { id: 3, name: 'Shirt', category: 'Clothing', price: 25 },
];

function App() {

  axios.defaults.withCredentials = true;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/allproducts');
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

            {/* a route for the Home page */}

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <ShopAllPage products={products} />
                </ProtectedRoute>
              }
            />

            <Route path="/product-listing/:id" element={<NewProductListing />} />

          

            <Route path="/" element={<Navigate to="/signin" replace />} />

            <Route path="/myoffers" element={<MyOffers />} />

            <Route path="/mylistings" element={<MyListings />} />
            <Route path="/myLikes" element={<MyLikes />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/chat/conversations" exact component={Conversations} />
            <Route path="/chat/:conversationId" exact component={ChatWindow} />

            <Route path="/signin" element={<Signin />} />

            <Route path="/messages" element={<Messages />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/PurchaseHistory" element={<PurchaseHistory />} />
          </Routes>
        </main>

      </Router>
    </div>
  );
}

export default App;
