import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../Product/Product'; 
import ProductDetail from '../Product/ProductDetail';
import Footer from '../Footer/Footer';

const Category = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
       
      </Routes>
      <Footer/>
    </div>
  );
};

export default Category;
