import React from 'react';
import '../styles/ProductList.css';
import ProductItem from './ProductItem';

function ProductList({ products }) {
  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.map((product, index) => (
          <ProductItem key={index} title={product.title} price= {product.price} image={product.images[0]} description={product.description} id = {product._id} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;