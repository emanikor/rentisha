import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import List from "./pages/List";  
import Category from "./pages/Category";
import About from "./pages/About";
import Navbar from "./Navbar/Navbar";
import Sign from "./pages/Sign";
import ProductListing from './ListOfItem/ProductListing';  
import ProductDetail from './Product/ProductDetail';
import Checkout from "./Preview/Checkout";

function App() {
  const [listitems, setListitems] = useState([]);

  const listItemsHandler = (newItem) => {
    setListitems((prevListItems) => [...prevListItems, newItem]);
  };
  
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/list" element={<List listItemsHandler={listItemsHandler} />} />
          <Route path="/checkout" element={<Checkout listitems={listitems} />} />
          <Route path="/rent" element={<ProductListing products={listitems} />} />
          
          <Route path='/category' element={<Category />}>
        </Route>
          <Route path="/product/:productId" element={ProductDetail} />
          
          <Route path='/About' element={<About />} />
          <Route path='/sign' element={<Sign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;