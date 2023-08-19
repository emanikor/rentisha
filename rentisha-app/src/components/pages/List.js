import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ListofItems from '../ListOfItem/ListofItems';

const List = () => {
  const [listitems, setListitems] = useState([]);
  const navigate = useNavigate();

  const listItemsHandler = (newItem) => {
    setListitems((prevListItems) => [...prevListItems, newItem]);
  };

  const handleFinishListing = () => {
    // Navigate to the checkout page when the listing is finished
    navigate('/checkout');
  };

  useEffect(() => {
    console.log("Updated Item List:", listitems);
  }, [listitems]);

  return (
    <div>
      <ListofItems listItemsHandler={listItemsHandler} />
      
      <button onClick={handleFinishListing}>Finish Listing</button>
      <Footer />
    </div>
  );
};

export default List;
