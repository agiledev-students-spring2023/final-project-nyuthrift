import React from 'react';
import ProductItem from './ProductItem'
import './Home.css';

import ProductList from './ProductList';
import dummyProducts from './dummyData';

import Button from './Button';


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

                <ProductItem
                    name="Product Name"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae massa nunc. Praesent quis nibh sit amet nibh pharetra eleifend. Vestibulum vel felis lacus."
                    image="https://via.placeholder.com/200"
                />
            
                
                 <Button
                    to = "/recentlyviewed"
                    className = "myButton"
                    text = "Recently Viewed"
                />
               
            </div>
            <div className="for-you-contianer">
                <h1>For You</h1>
                <ProductItem
                    name="Product Name"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae massa nunc. Praesent quis nibh sit amet nibh pharetra eleifend. Vestibulum vel felis lacus."
                    image="https://via.placeholder.com/200"
                />

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