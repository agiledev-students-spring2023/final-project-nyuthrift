import React from 'react';
import './ProductPage.css';
import Navbar from '../Navbar/Navbar';

function ProductPage() {
  return (
    <div>
      <h1>Product Page</h1>
      <img class="sample_product" src={process.env.PUBLIC_URL + '/images/sample_product.png'} alt="logo" />
      <p>This is a brief description of the product.</p>
      <button>Add to Cart</button>
      <div class='navbar'>
        <Navbar />
      </div>
    </div>
  );
}

export default ProductPage;