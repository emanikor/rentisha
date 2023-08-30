import React, { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/AuthContext'; 
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ListofItems from '../ListOfItem/ListofItems';
import ItemsFrontPage from '../ListOfItem/ItemsFrontPage';

const List = () => {
  const [listitems, setListitems] = useState([]);
  // const navigate = useNavigate();
  // const { itemId } = useParams();

  const { isAuthenticated } = useAuth(); 

  const listItemsHandler = (newItem) => {
    setListitems((prevListItems) => [...prevListItems, newItem]);
  };

  // const handleFinishListing = () => {
    
  //   navigate(`/checkout/${itemId}`);
  // };

  useEffect(() => {
    console.log("Updated Item List:", listitems);
  }, [listitems]);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <ListofItems listItemsHandler={listItemsHandler} />
          {/* <button className='btnHero flexCenter' onClick={handleFinishListing}>
            edit list 
          </button> */}
          <Footer />
        </>
      ) : (
        <ItemsFrontPage />
      )}
    </div>
  );
};

export default List;
