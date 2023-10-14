
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Product.css';

function ProductsByCategory() {
  
  const [products, setProducts] = useState([]);
  const { category } = useParams(); 

  useEffect(() => {
    
    axios.get(`http://localhost:4000/ListofItemsByCategory/${category}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [category]); 

  return (
    <div className="product-list">
      <h2 className='categoryN flexColStart paddings'>Check the available: {category}</h2>
      <div className="fetched-items">
        {products.map(product => (
          <Link key={product._id} to={`/checkout/${product._id}`}>
            <div className="card">
              <img src={product.ItemImage} alt={product.ItemName} />
              <h3 className="item-name">{product.ItemName}</h3>
              <p className="item-description">{product.ItemDescription}</p>
              <p className="item-price">${product.ItemPrice}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsByCategory;
