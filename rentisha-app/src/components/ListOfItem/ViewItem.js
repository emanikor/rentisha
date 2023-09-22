import React, { useState, useEffect } from 'react';
import ProductListing from '../ListOfItem/ProductListing';
import Product from '../Product/Product';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './View.css';
import pixel from '../images/pixel.jpg'

const ViewItem = () => {
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    console.log('itemId:', itemId);
    axios.get(`http://localhost:4000/ListofItems/${itemId}`)
      .then(response => {
        console.log(response.data);
        setProduct(response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Product/>
      {product ? (
        <div className='item-profile'>
        <div className="item-card">
          <img src={pixel} alt={product.ItemName} />
          <h3>{product.ItemName}</h3>
          <p>{product.ItemDescription}</p>
          <p>Price: ${product.ItemPrice}</p>
          
        </div>
        </div>
      ) : (
        <div>Product not found</div>
      )}
   
    </div>
  );
};

export default ViewItem;
