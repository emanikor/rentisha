import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ListofItems from '../ListOfItem/ListofItems';
// import ProductListing from '../ListOfItem/ProductListing';

const List = () => {
  const [listitems, setListitems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated Item List:", listitems);
  }, [listitems]);

const listItemsHandler = (newItem) => {
  setListitems((prevListItems) => [...prevListItems, newItem]);
  navigate('/checkout');
};


  return (
    <div>
      <ListofItems listItemsHandler={listItemsHandler} />
      
      {/* <ProductListing products={listitems} /> */}
      <Footer />
    </div>
  );
};

export default List;
