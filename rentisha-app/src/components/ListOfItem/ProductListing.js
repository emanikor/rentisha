import React, { useState } from 'react';
import './Rent.css'; 
import shoes from '../images/shoes.jpg';

const ProductListing = ({ products }) => {
  return (
    <div className="product-listing">
      <h2>Product Listing</h2>
      {products.map((item) => (
        <div key={item._id} className="product">
          <div className="product-image">
            <img src={shoes} alt={item.ItemName} />
          </div>
          <div className="product-details">
            <h3 className="item-name">{item.ItemName}</h3>
            <p className="item-description">{item.ItemDescription}</p>
            <p className="item-type">{item.ItemType}</p>
            <p className="item-price">${item.ItemPrice}</p>
            <p className="drop-address">{item.DropAddress}</p>
            <p className="time">{item.Time}</p>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
