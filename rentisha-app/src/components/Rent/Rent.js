import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Rent.css'
import axios from "axios";

const ProductListing = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch 
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Rent");
        setProductList(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-listing">
      <h2>Product Listing</h2>
      <div className="products">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
