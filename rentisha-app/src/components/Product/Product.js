
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import './Product.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);


  const [items, setItems] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of available categories from your MongoDB server
    axios.get('http://localhost:4000/api/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    // Fetch all products initially
    axios.get('http://localhost:4000/ListofItems')
      .then(response => {
        setProduct(response.data);
        setFilteredProducts(response.data); // Initially, set filtered products to all products
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (category) {
      // Fetch products based on the selected category
      axios.get(`http://localhost:4000/ListofItemsByCategory/${category}`)
        .then(response => {
          setFilteredProducts(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // If no category is selected, show all products
      setFilteredProducts(products);
    }
  }, [category, products]);
  

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <h2>Products by Category</h2>
      <div>
        <label htmlFor="categorySelect">Select a Category:</label>
        <select id="categorySelect" onChange={handleCategoryChange}>
          <option value="">-- Select Category --</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="fetched-items">
          {items.map(item => (
              <Link
              key={item._id}
               to={`/checkout/${item._id}`} 
            >
            <div key={item._id} className="card">
              <img src={item.ItemImage} alt={item.ItemName} />
              <h3 className="item-name">{item.ItemName}</h3>
              <p className="item-description">{item.ItemDescription}</p>
              <p className="item-price">${item.ItemPrice}</p>
            </div>
            </Link>
          ))}
        </div>
        <div className="fetched-items">
  {filteredProducts.map(product => (
    <Link
      key={product._id}
      to={`/checkout/${product._id}`}
    >
      <div key={product._id} className="card">
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

export default ProductList;