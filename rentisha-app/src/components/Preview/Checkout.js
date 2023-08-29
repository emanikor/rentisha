import React, { useState, useEffect } from 'react';
import ProductListing from '../ListOfItem/ProductListing';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Checkout = () => {
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
    <h2>Rent Page</h2>
    {product ? <ProductListing products={[product]} /> : <div>Product not found</div>}
  </div>
);
};

export default Checkout;
