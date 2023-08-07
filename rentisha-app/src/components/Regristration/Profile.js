import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


import '../component.css'

const ListofItems=()=>{


  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/SignIn");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("SignIn");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/SignIn");
  };
  return (
    
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log out</button>
  
      <ToastContainer />

    <div className='listInput'>
        
        <form>
        <h2 className='headProduct paddings'>List of Items page</h2>
            <label>Item Name</label>
          
          <input type='name' placeholder='enter item name'></input>

          <lable>Item Description </lable>
          <textarea typeof='message' placeholder='Text area for the renter to provide a description of the item, including any relevant details or specifications.'></textarea>

          <lable>Item  Category:</lable>
          <input type='name' placeholder='Input item you want to rent; Laptop, Phone , Camera etc...'></input>
          <label>Listing price</label>
          <input type='text' placeholder='specify the rental price per day or per week.'></input>
          <div className="inputField flexCenter">
          <div className='input'>
            <h3>Availability</h3>
          <label htmlFor='drop-address' className='label'>Drop-off Address</label>
          <div className='input-wrapper'>
            <input type='text' id='drop-address' placeholder='Enter your location...' />
            <i class="fa-solid fa-location-dot"></i>
          </div>
        </div>
        <div className='input'>
          <label htmlFor='pick-date' className='label'>Pick-up Date</label>
          <input type='date' id='pick-date' />
        </div>
        <div className='input'>
          <label htmlFor='pick-time' className='label'>Pick-up Time</label>
          <input type='time' id='pick-time' />
        </div>
        
            <h4>Owners Details</h4>
            <lable>First name</lable>
            <input type='name' name='firstName'></input>
            <lable>Second name</lable>
            <input type='name' name='firstName'></input>
            <lable> phone No.</lable>
            <input type='number' id='number'></input>
        
        </div>

        
        <div className='TermsCondition flexColStart '>
            <input type='radio'></input>  
            <p>Check the box r to agree to the terms and conditions of renting on the Rentisha platform.</p>      

        </div>
        <button className='btnHero'>Submit</button>
        </form>

    </div>
    </div>
  )
}

export default ListofItems
 
 