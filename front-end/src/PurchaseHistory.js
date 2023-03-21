import React from 'react';
import './PurchaseHistory.css';

const purchaseHistoryData = [
  {
    productImage: '/images/sample_product.png',
    productName: 'Product 1',
    sellerName: 'Seller A',
    price: '$99.99',
    purchaseTime: '2023-03-20 12:34:56',
  },
  {
    productImage: '/images/sample_product.png',
    productName: 'Product 2',
    sellerName: 'Seller B',
    price: '$199.99',
    purchaseTime: '2023-03-18 09:15:32',
  },
  {
    productImage: '/images/sample_product.png',
    productName: 'Product 3',
    sellerName: 'Seller C',
    price: '$49.99',
    purchaseTime: '2023-03-15 16:25:45',
  },
  {
    productImage: '/images/sample_product.png',
    productName: 'Product 4',
    sellerName: 'Seller D',
    price: '$29.99',
    purchaseTime: '2023-03-10 11:05:12',
  },
  {
    productImage: '/images/sample_product.png',
    productName: 'Product 5',
    sellerName: 'Seller E',
    price: '$79.99',
    purchaseTime: '2023-03-08 18:42:37',
  },
  {
    productImage: '/images/sample_product.png',
    productName: 'Product 6',
    sellerName: 'Seller F',
    price: '$39.99',
    purchaseTime: '2023-03-05 14:19:23',
  },
  {
    productImage: '/images/sample_product.png',
    productName: 'Product 7',
    sellerName: 'Seller G',
    price: '$89.99',
    purchaseTime: '2023-03-01 20:55:18',
  }  
];

function PurchaseHistory() {
  return (
    <div className="purchase-history">
      <h1>Purchase History</h1>
      <div className="purchase-list">
        {purchaseHistoryData.map((item, index) => (
          <div key={index} className="purchase-item">
            <img src={process.env.PUBLIC_URL + item.productImage} alt="product" />
            <div className="purchase-info">
              <p className="product-name">{item.productName}</p>
              <p className="seller-name">Seller: {item.sellerName}</p>
              <p className="price">Price: {item.price}</p>
              <p className="purchase-time">Purchased on: {item.purchaseTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseHistory;
