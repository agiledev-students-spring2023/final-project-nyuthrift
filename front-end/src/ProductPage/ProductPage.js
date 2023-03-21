import React from 'react';
import './ProductPage.css';
import Navbar from '../Navbar/Navbar';

function ProductPage() {
  return (
    <div>
      <h1>Product Page</h1>
      <div className="seller-info">
        <span className="seller-name">Seller Name</span>
        <span className="seller-rating">Rating: 4.5</span>
      </div>
      <img className="sample_product" src={process.env.PUBLIC_URL + '/images/sample_product.png'} alt="logo" />
      <div className="price-like-container">
        <span className="price-tag">$199.99</span>
        <button className="like-button">Like</button>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <div className="button-row">
        <button className="action-button">Buy</button>
        <button className="action-button">Offer</button>
        <button className="action-button">Contact Seller</button>
      </div>
      <div className="navbar">
        <Navbar />
      </div>
    </div>
  );
}

export default ProductPage;