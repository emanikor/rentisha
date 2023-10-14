import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../Product/Product'; 
import ProductDetail from '../Product/ProductsByCategory';
import Footer from '../Footer/Footer';

const Category = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:category" element={<ProductDetail />} />
       
      </Routes>
      <Footer/>
    </div>
  );
};

export default Category;

