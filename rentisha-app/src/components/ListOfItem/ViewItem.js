import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './View.css';
import pixel from '../images/pixel.jpg';
import Product from '../Product/Product';
import Category from '../pages/Category';
import ProductDetail from '../Product/ProductsByCategory';
import { useNavigate } from "react-router-dom";

const ViewItem = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { itemId } = useParams();
  const navigate = useNavigate();



  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/ListofItems/${itemId}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [itemId]);
  



  const [selectedCategory, setSelectedCategory] = useState('');
  

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePostItem = async () => {
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    setLoading(true);

    try {
      // Make a POST request to your backend API to post the item to the selected category
      const response = await axios.post('http://localhost:4000/api/related-products', {
        itemId,
        category: selectedCategory,
      });

      if (response.status === 200) {
        alert('Item posted successfully');
        navigate(`/product/${itemId}`);
      } else {
        console.log('item failed to post');
      }
    } catch (error) {
      console.error(error);
   
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='item-profile'>
      {product ? (
        <div className='item-card'>
          <img src={product.ItemImage} alt={product.ItemName} />
          <h3>{product.ItemName}</h3>
       
          <p>{product.ItemDescription}</p>
          <p>Price: ${product.ItemPrice}</p>
          
          <div>      
      <div>
        <label>Select a Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
       
          
          <option value=''>Select category</option>
        <option value='phones'>Phones</option>
        <option value='clothes'>Clothes</option>
        <option value='drone'>Drone</option>
        <option value='laptops'>Laptops</option>
        <option value='cameras'>Cameras</option>
        <option value='cameras'>Tvs</option>
        <option value='cameras'>Gym equipment</option>
        </select>
      </div>

      <button onClick={handlePostItem} disabled={loading}>
        {loading ? 'Posting...' : 'Post Item'}
      </button>
      <button className='item-btn'>Edit</button>
    </div>
        </div>
        
      ) : (
        <div>Product not found</div>
      )}
      
      
      
    </div>
    
  );
};

export default ViewItem;
