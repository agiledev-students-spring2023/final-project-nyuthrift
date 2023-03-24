import React from 'react';
import './MyLikes.css';
import ProductList from './ProductList';
import dummyProducts from './dummyData';
import SearchBar from './search_bar';
import Button from './Button';
let search_data = dummyProducts.map((el) =>  el.name)

const MyLikes = () => {
    return (
        <div className="home-page">
            <SearchBar products={search_data}/>
            <div className="my-likes-container">
                <h1>My Likes</h1>
                <ProductList products={dummyProducts}/>
            </div>
        </div>
    );
};

export default MyLikes;