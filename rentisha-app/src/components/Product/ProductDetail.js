import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.css'

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [productId]);

  if (product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.Title}</h2>
      <p>Category: {product.Cat}</p>
      <p>Price: {product.Price}</p>
      <img src={`/images/${product.Img}`} alt={product.Title} />
    </div>
  );
};

export default ProductDetail;
