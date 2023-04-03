import React from 'react';
import './ProductItem.css';
import {Link} from 'react-router-dom'

function ProductItem({ name, description, image, id }) {
  return (
    <div className="product-item">
      <Link to={`/products/${id}`} className = 'product-item-link'>
        <h2 className="product-name">{name}</h2>
      </Link>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <p className="product-description">{description}</p>
    </div>
  );
}

export default ProductItem;