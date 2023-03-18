
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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

let products = ['shirt', 'textbook'];


function App() {
  return (
    
    <div className="App">
      
      <Router>
        <Navbar />
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            {/* <Route path="/" element={<Home />} /> */}


            {/* a route for the Login page */}
            <Route path="/login" element={<Login />} />

            {/* a route for the Home page */}
            <Route path="/home" element={<Home />} />

            {/* a route for the Product page */}
            <Route path="/product" element={<ProductPage />} />
                

            {/* a route for the Login page */}

            <Route path="/" element={
            <SearchBar products={products}/>
            
            }/>

            <Route path="/login" element={<Login />} />


            <Route path="/chat" element = {<Chat />} />

            <Route path="/signup" element={<Signup/>} />

            
            <Route path="/signin" element={<Signin />} />
            
            <Route path="/messages" element={<Messages />}/>
            <Route path="/myprofile" element={<MyProfile />}/>
          </Routes>
        </main>
       
      </Router>
    </div>
  );
}

export default App;