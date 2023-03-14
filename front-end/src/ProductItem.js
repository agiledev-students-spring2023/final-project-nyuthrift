import React from 'react';
import './ProductItem.css';

function ProductItem({ name, description, image }) {
  return (
    <div className="product-item">
      <h2 className="product-name">{name}</h2>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <p className="product-description">{description}</p>
    </div>
  );
}

export default ProductItem;