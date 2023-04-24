import React from 'react';
import '../styles/ProductItem.css';
import {Link} from 'react-router-dom'

function ProductItem({ title, price, description, image, id }) {
  return (
    <div className="product-item">
      <Link to={`/product-listing/${id}`} className = 'product-item-link'>
        
        <div className="product-image-container">
          <img src={`${process.env.REACT_APP_UPLOADS_URL}/${image}`} alt={title} className="product-image" />
        </div>
        <h2 className="product-name">{title}</h2>
      </Link>
      <p className="product-description">${price}</p>
    </div>
  );
}

export default ProductItem;