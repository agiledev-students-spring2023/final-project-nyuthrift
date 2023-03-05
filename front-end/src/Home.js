import React from 'react';
import ProductItem from './ProductItem'
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <div className="recently-viewed-container">
                <h1>Recently Viewed</h1>
                <ProductItem
                    name="Product Name"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae massa nunc. Praesent quis nibh sit amet nibh pharetra eleifend. Vestibulum vel felis lacus."
                    image="https://via.placeholder.com/200"
                />
            </div>
            <div className="for-you-contianer">
                <h1>For You</h1>
            </div>
        </div>
    );
};



export default Home;