// LaptopCategory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LaptopCategory = () => {
  const [laptopProducts, setLaptopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch laptop products from the server
    axios.get('/api/products?category=laptop') 
      .then(response => {
        setLaptopProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Laptop Category</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {laptopProducts.map(product => (
            <div key={product.id}>
              {/* Display product information here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaptopCategory;
