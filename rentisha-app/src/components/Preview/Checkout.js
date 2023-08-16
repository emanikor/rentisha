import React from 'react';
import ProductListing from '../ListOfItem/ProductListing';

const checkout = ({ listitems }) => {
  return (
    <div>
      <h2>Rent Page</h2>
      <ProductListing products={listitems} />
    </div>
  );
};

export default checkout;
