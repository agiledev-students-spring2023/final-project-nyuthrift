import React from 'react';
import ProductItem from './ProductItem'
import './Home.css';
import ProductList from './ProductList';
import dummyProducts from './dummyData';

const Home = () => {
    return (
        <div className="home-page">
            <div className="recently-viewed-container">
                <h1>Recently Viewed</h1>
                <ProductList products={dummyProducts}/>
            </div>
            <div className="for-you-contianer">
                <h1>For You</h1>
                <ProductList products={dummyProducts}/>
            </div>
        </div>
    );
};


export default Home;