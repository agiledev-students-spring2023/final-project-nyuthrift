import React from 'react';
import './ProductList.css';
import ProductItem from './ProductItem';

function ProductList({ products }) {
  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.map((product, index) => (
          <ProductItem key={index} name={product.name} image={product.image} description={product.description} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;