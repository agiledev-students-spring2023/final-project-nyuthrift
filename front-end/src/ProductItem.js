import React from 'react';
import './ProductItem.css';

function ProductItem({ name, description, image }) {
  return (
    <div className="product-item">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
}

export default ProductItem;