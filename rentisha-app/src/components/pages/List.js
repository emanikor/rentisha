import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ListofItems from '../ListOfItem/ListofItems';





const List  =( )=> {
const [listitems, setListitems] =useState([]);
const navigate = useNavigate(); 

const listItemsHandler = (newItem) => {
  setListitems((prevListItems) => [...prevListItems, newItem]);
  navigate('/rent'); 

  console.log("Updated Item List:", listitems);
};

  return (
    <div>
      <ListofItems listItemsHandler={ listItemsHandler}/>
      {/* <Product products={listitems} /> */}
      <Footer/>
      
    </div>
  )
}

export default List