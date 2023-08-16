import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './Product.css';
// import Category1 from '../images/Category1.png';
// import Category2 from '../images/Category2.png';
// import Category3 from '../images/Category3.png';



const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(response => {
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

  // console.log('Product Image:', `/images/${product.Img}`);

  return (
    <div className='product'>
      <h1 className='paddings headProduct flexCenter'>Explore Category</h1>
      <div className='paddings card-Product'>
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className='card-Product-container'
          >
            <div className='card-Product-container'>
            <img src={`/images/${product.Img}`} alt={product.Title} />
              <div className='flexColStart product-card-body'>
                <h3 className='secondaryText'>{product.Title}</h3>
                <h3 className='secondaryText'>{product.Cat}</h3>
                <div className='flexCenter cart'>
                  <h3 className='secondaryText'>price: {product.Price}</h3>
                  <i className='fa-solid fa-cart-shopping'></i>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
