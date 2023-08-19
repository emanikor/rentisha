import React, { useState, useEffect } from 'react';
import ProductListing from '../ListOfItem/ProductListing';
import axios from 'axios';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("effects")
    axios.get('http://localhost:4000/ListofItems')
      .then(response => {
        console.log("promise fulfilled")
        console.log(response.data)
        setProducts(response.data);
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
      <ProductListing products={products} />
    </div>
  );
};

export default Checkout;
