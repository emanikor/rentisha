import React, { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ListofItems from '../ListOfItem/ListofItems';
import ItemsFrontPage from '../ListOfItem/ItemsFrontPage';

const List = () => {
  const [listitems, setListitems] = useState([]);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth(); 

  const listItemsHandler = (newItem) => {
    setListitems((prevListItems) => [...prevListItems, newItem]);
  };

  const handleFinishListing = () => {
   
    navigate('/checkout');
  };

  useEffect(() => {
    console.log("Updated Item List:", listitems);
  }, [listitems]);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <ListofItems listItemsHandler={listItemsHandler} />
          <button onClick={handleFinishListing}>Finish Listing</button>
          <Footer />
        </>
      ) : (
        <ItemsFrontPage />
      )}
    </div>
  );
};

export default List;
