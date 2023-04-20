import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import './styles/ShopAll.css';
import SearchBar from './components/search_bar';


const ShopAllPage = ({products}) => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [searchVal, setSearchVal] = useState('');

   

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedPrice('');
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    setSelectedCategory('');
  };

  const handleSearchChange = (event) => {
    setSearchVal(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === '' || product.category === selectedCategory) &&
      (selectedPrice === '' ||
        (selectedPrice === 'under25' && product.price < 25) ||
        (selectedPrice === '25to50' && product.price >= 25 && product.price <= 50) ||
        (selectedPrice === 'over50' && product.price > 50)) &&
      (searchVal === '' || product.name.toLowerCase().includes(searchVal.toLowerCase()))
  );

  return (
    <div className="shop-all-container">
      <h1 className="shop-all-title">Shop All</h1>
      <div className="filters-container">
        <label className="filter-label">
          Category:
          <select value={selectedCategory} onChange={handleCategoryChange} className="filter-select">
            <option value="">All</option>
            <option value="Tech">Tech</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
          </select>
        </label>
        <label className="filter-label">
          Price:
          <select value={selectedPrice} onChange={handlePriceChange} className="filter-select">
            <option value="">All Prices</option>
            <option value="under25">Under $25</option>
            <option value="25to50">$25 to $50</option>
            <option value="over50">Over $50</option>
          </select>
        </label>
        <SearchBar handleSearchChange={handleSearchChange} products={products} />
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ShopAllPage;
