import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import List from "./pages/List";
import Item from "./pages/Category";
import Category from "./pages/Category";
import About from "./pages/About";
import Navbar from "./Navbar/Navbar";
import Reviews from "./pages/Reviews";
import Sign from "./pages/Sign";
import ProductListing from './Rent/ProductListing';




function App() {
  const [listitems, setListitems] = useState([]);
  
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} exact>
            
          </Route>
          <Route path="/list" element={<List />} />
          <Route path="/rent" element={<ProductListing products={listitems} />} />
          <Route path='/item' element={<Item />}>
         
          </Route>
          <Route path='/category' element={<Category />}>
           
          </Route>
          <Route path='/Reviews' element={<Reviews />}>
           
           </Route>

          <Route path='/About' element={<About />}>
           
          </Route>
          <Route path='/sign' element={<Sign />}>
          
           </Route>
          
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
