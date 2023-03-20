


import React from 'react';
import './Home.css';
import ProductList from './ProductList';
import dummyProducts from './dummyData';
import SearchBar from './search_bar';
import Button from './Button';
let search_data = dummyProducts.map((el) =>  el.name)

const Home = () => {
    return (
        <div className="home-page">
            <SearchBar products={search_data}/>
            <div className="recently-viewed-container">
                <h1>Recently Viewed</h1>

                <ProductList products={dummyProducts}/>
                <Button
                    to = "/recentlyviewed"
                    className = "myButton"
                    text = "Recently Viewed"
                />
            </div>
            <div className="for-you-container">
                <h1>For You</h1>
                <ProductList products={dummyProducts}/>
                <Button
                    to = "/allproducts"
                    className = "myButton"
                    text = "View All"
                />
            </div>
        </div>
    );
};

export default Home;