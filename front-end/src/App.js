
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//import logo from './logo.svg';

//import Login from './Login'
import SearchBar from './search_bar';


import './App.css';
import Login from './Login'
import Home from './Home'
let products = ['shirt', 'textbook'];


function App() {
  return (
    
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            {/* <Route path="/" element={<Home />} /> */}


            //{/* a route for the Login page */}
            //<Route path="/login" element={<Login />} />

            {/* a route for the Home page */}
            <Route path="/home" element={<Home />} />
                

            {/* a route for the Login page */}

            <Route path="/" element={<SearchBar products={products}/>} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
       
      </Router>
    </div>
  );
}

export default App;