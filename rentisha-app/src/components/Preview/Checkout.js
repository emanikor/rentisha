import React, { useState, useEffect } from 'react';
import ProductListing from '../ListOfItem/ProductListing';
import axios from 'axios';

const Checkout = ({ listitems }) => {  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/ListofItems') 
      .then(response => {
        console.log('Fetched data:', response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Rent Page</h2>
      <ProductListing products={listitems} /> 
    </div>
  );
};

export default Checkout;
