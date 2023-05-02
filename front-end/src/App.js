import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Conversations from './chat/Conversations';
import ChatWindow from './chat/chatwindow';

import Navbar from './components/navBar';

import './styles/App.css';
import MyProfile from './MyProfile';

import Signup from './Signup';
import Signin from './Signin';
import Messages from './Messages';
import MyOffers from './MyOffers';
import Sell from './Sell';
import MyListings from './MyListings';
import MyLikes from './MyLikes';
import PurchaseHistory from './PurchaseHistory';
import ShopAllPage from './ShopAll';
import ProtectedRoute from './components/Protected';
import NewProductListing from './NewProductListing';

function App() {
  axios.defaults.withCredentials = true;
  const [products, setProducts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/allproducts');
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/current-user', {
        credentials: 'include',
      });
      const data = await response.json();

      setCurrentUserId(data.id);
    } catch (error) {
      console.error('Error fetching current user', error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="App-main">
          <Routes>
            <Route path="/product-listing/:id" element={<ProtectedRoute><NewProductListing /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><ShopAllPage products={products} /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/myoffers" element={<ProtectedRoute><MyOffers /></ProtectedRoute>} />
            <Route path="/mylistings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
            <Route path="/myLikes" element={<ProtectedRoute><MyLikes /></ProtectedRoute>} />
            <Route
              path="/chat/conversations"
              element={
                <ProtectedRoute>
                  <Conversations currentUserId={currentUserId} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:conversationId"
              element={
                <ProtectedRoute>
                  <ChatWindow currentUserId={currentUserId} />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
            <Route path="/PurchaseHistory" element={<ProtectedRoute><PurchaseHistory /></ProtectedRoute>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
