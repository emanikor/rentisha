import React from 'react'
import Footer from '../Footer/Footer';
import ListofItems from '../ListOfItem/ListofItems';
import Product from '../Rent/Rent';




const List  =()=> {


  const listitems =[
    {
      id:"1",
      ItemName: "conny",
      ItemDescription: "pro 30 10px",
      ItemType: "camera xl 40",
      ItemPrice: "600",
      DropAddress: "nairobi",
      Date: "12.3.2023",
      Time: "4:000",
      FirstName: "conny",
      SecondName: "john",
      PhoneNumber: "0796765430",
      ItemImage: null,
},
{
  id:"3",
  ItemName: "iphone 13",
  ItemDescription: "pro 30 10px iphone 30",
  ItemType: "camera xl 40 600px",
  ItemPrice: "600000",
  DropAddress: "nakuru",
  Date: "12.3.2023",
  Time: "4:000",
  FirstName: "firstconny",
  SecondName: "secjohn",
  PhoneNumber: "0796765430",
  ItemImage: null,
},
{
  id:"2",
  ItemName: "tv set",
  ItemDescription: "pro 30 10px",
  ItemType: "tcl pro medium",
  ItemPrice: "50000",
  DropAddress: "mombasa",
  Date: "12.3.2023",
  Time: "4:000",
  FirstName: "samconny",
  SecondName: "doejohn",
  PhoneNumber: "0796765430",
  ItemImage: null,
},
]
  

  return (
    <div>
      <ListofItems/>
      <Product products={listitems} />
      <Footer/>
      
    </div>
  )
}

export default List