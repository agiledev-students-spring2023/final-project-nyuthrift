


import React from 'react';
import './styles/Home.css';
import ProductList from './components/ProductList';
import dummyProducts from './dummyData';
import SearchBar from './components/search_bar';
import Button from './components/Button';
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
                    to = "/all"
                    className = "myButton"
                    text = "SHOP ALL"
                />
            </div>
        </div>
    );
};

export default Home;