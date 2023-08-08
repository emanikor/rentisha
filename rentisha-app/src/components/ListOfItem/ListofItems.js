<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './ListOfItems.css';
import listImage from '../images/listImage.jpg';

const ListofItems = () => {
  const Navigate = useNavigate();
  const initialValues = {
    ItemName: "",
    ItemDescription: "",
    ItemType: "",
    ItemPrice: "",
    DropAddress: "",
    Date: "",
    Time: "",
    FirstName: "",
    SecondName: "",
    PhoneNumber: "",
    termsCondition: false,
  };

  const [values, setValues] = useState(initialValues);
  const [user, setUser] = useState(null);

  const generateSuccess = (success) => toast.success(success, {
    position: "bottom-right"
  });

  const generateError = (err) => toast.error(err, {
    position: "bottom-right"
  });

  // Fetch user data
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/CheckUser", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  fetchUser();
}, []);

  // Handle list submit
  const listSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
    
      generateError("You need to be logged in to list an item.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:4000/ListofItems", {
        ...values,
        ownerId: user._id,
      });

      if (data && data.message) {
        generateSuccess("Item listed successfully");
        setValues(initialValues);
      } else {
        generateError("Failed to list item");
      }
    } catch (err) {
      console.log(err);
      generateError("An error occurred");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: inputValue });
  };

  return (
    <div className='listInput'>
        
    <form onSubmit={listSubmit} >
    <h2 className='headProduct paddings'>List of Items page</h2>
        <label>Item Name</label>
      
        <input
          type='text'
          name='ItemName'
          placeholder='Enter item name'
          value={values.ItemName}
          onChange={handleInputChange}
        />

        
         <label>Item Description</label>
        <textarea
          name='ItemDescription'
          placeholder='Enter item description...'
          value={values.ItemDescription}
          onChange={handleInputChange}
        ></textarea>


      <label>Item Category:</label>
      <input
          type='text'
          name='ItemType'
          placeholder='Input item category...'
          value={values.ItemType}
          onChange={handleInputChange}
        />

       <label>Listing price</label>
        <input
          type='Number'
          name='ItemPrice'
          placeholder='Specify the rental price...'
          value={values.ItemPrice}
          onChange={handleInputChange}
        />

      <div className="inputField">
          <div className='input'>
            <label className='label'>Drop-off Address</label>
            <div className='input input-wrapper'>
              <input
                type='text'
                name='DropAddress'
                placeholder='Enter drop-off address...'
                value={values.DropAddress}
                onChange={handleInputChange}
              />
              <i className="fa-solid fa-location-dot"></i>
            </div>
          </div>
          <div className='input'>
            <label htmlFor='pick-date' className='label'>Pick-up Date</label>
            <input
              type='date'
              name='Date'
              placeholder='Enter pick up date...'
              value={values.Date}
              onChange={handleInputChange}
            />
          </div>
          <div className='input'>
            <label htmlFor='pick-time' className='label'>Pick-up Time</label>
            <input
              type='time'
              name='Time'
              placeholder='Enter pick-up time...'
              value={values.Time}
              onChange={handleInputChange}
            />
          </div>
      </div>
      
      <div className='OwnerInput'>
        <h4>Owner's Details</h4>
        <div className="inputField">
          <div className='input'>
            <label htmlFor='name'>First Name</label>
            <div className='input input-wrapper'>
              <input
                type='text'
                name='FirstName'
                required
                placeholder='Enter your first name...'
                value={values.FirstName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='input'>
            <label htmlFor='name'>Second Name</label>
            <div className='input input-wrapper'>
              <input
                type='text'
                name='SecondName'
                required
                placeholder='Enter your second name...'
                value={values.SecondName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='input'>
            <label htmlFor='phone number'>Phone Number</label>
            <input
          
            type='number'
            name='PhoneNumber'
            placeholder='enter phone number...'
            value={values.PhoneNumber}
            onChange={handleInputChange}
          />
  
            
          </div>
        </div>
        <div className='TermsCondition'>
          <input
            type='checkbox'
            name='termsCondition'
            id='termsCondition'
            checked={values.termsCondition}
            onChange={handleInputChange}
          />
          <label htmlFor='termsCondition'>
            Check the box to agree to the terms and conditions of renting on the Rentisha platform.
          </label>
        </div>
      </div>
   
      <button className='btnHero'>Submit</button>
    </form>
    <img src={listImage} alt='inputImage'></img>
    <ToastContainer />
  </div>
  )
}

export default ListofItems;
=======
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './ListOfItems.css';
import listImage from '../images/listImage.jpg';

const ListofItems = () => {
  const Navigate = useNavigate();
  const initialValues = {
    ItemName: "",
    ItemDescription: "",
    ItemType: "",
    ItemPrice: "",
    DropAddress: "",
    Address: "",
    Date: "",
    Time: "",
    FirstName: "",
    SecondName: "",
    PhoneNumber: "",
    termsCondition: false,
  };

  const [values, setValues] = useState(initialValues);
  const [user, setUser] = useState(null);

  const generateSuccess = (success) => toast.success(success, {
    position: "bottom-right"
  });

  const generateError = (err) => toast.error(err, {
    position: "bottom-right"
  });



   // fetch user data 

  useEffect(()=>{
   
    const fetchUser = async () =>{
      try{
        const response = await axios.get("")
        setUser(response.data.user);

      }
      catch(error){
        setUser(null);
      }
    }
    fetchUser();
  },[]);





  // handle list submit
  const listSubmit = async (e) => {
    e.preventDefault();


    if(!user){
      // user not authenticated
      Navigate('/SignIn');
      return;  
    }

    try {
      const { data } = await axios.post("http://localhost:4000/ListofItems", {
        ...values
      });


      if (data && data.message) {
        generateSuccess("Item listed successfully");
        Navigate("/");
      } else {
        generateError("Failed to list item");
      }
    } catch (err) {
      console.log(err);
      generateError("An error occurred");
    }

    setValues(initialValues);
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: inputValue });
  };
  
  return (
    <div className='listInput'>
        
    <form onSubmit={listSubmit} >
    <h2 className='headProduct paddings'>List of Items page</h2>
        <label>Item Name</label>
      
        <input
          type='text'
          name='ItemName'
          placeholder='Enter item name'
          value={values.ItemName}
          onChange={handleInputChange}
        />

        
         <label>Item Description</label>
        <textarea
          name='ItemDescription'
          placeholder='Enter item description...'
          value={values.ItemDescription}
          onChange={handleInputChange}
        ></textarea>


      <label>Item Category:</label>
      <input
          type='text'
          name='ItemType'
          placeholder='Input item category...'
          value={values.ItemType}
          onChange={handleInputChange}
        />

       <label>Listing price</label>
        <input
          type='number'
          name='ItemPrice'
          placeholder='Specify the rental price...'
          value={values.ItemPrice}
          onChange={handleInputChange}
        />

      <div className="inputField">
          <div className='input'>
            <label className='label'>Drop-off Address</label>
            <div className='input input-wrapper'>
              <input
                type='text'
                name='DropAddress'
                placeholder='Enter drop-off address...'
                value={values.DropAddress}
                onChange={handleInputChange}
              />
              <i className="fa-solid fa-location-dot"></i>
            </div>
          </div>
          <div className='input'>
            <label htmlFor='pick-date' className='label'>Pick-up Date</label>
            <input
              type='date'
              name='Date'
              placeholder='Enter pick up date...'
              value={values.Date}
              onChange={handleInputChange}
            />
          </div>
          <div className='input'>
            <label htmlFor='pick-time' className='label'>Pick-up Time</label>
            <input
              type='time'
              name='Time'
              placeholder='Enter pick-up time...'
              value={values.Time}
              onChange={handleInputChange}
            />
          </div>
      </div>
      
      <div className='OwnerInput'>
        <h4>Owner's Details</h4>
        <div className="inputField">
          <div className='input'>
            <label htmlFor='name'>First Name</label>
            <div className='input input-wrapper'>
              <input
                type='text'
                name='FirstName'
                required
                placeholder='Enter your first name...'
                value={values.FirstName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='input'>
            <label htmlFor='name'>Second Name</label>
            <div className='input input-wrapper'>
              <input
                type='text'
                name='SecondName'
                required
                placeholder='Enter your second name...'
                value={values.SecondName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='input'>
            <label htmlFor='phone number'>Phone Number</label>
            <input
          
            type='number'
            name='PhoneNumber'
            placeholder='enter phone number...'
            value={values.PhoneNumber}
            onChange={handleInputChange}
          />
  
            
          </div>
        </div>
        <div className='TermsCondition'>
          <input
            type='checkbox'
            name='termsCondition'
            id='termsCondition'
            checked={values.termsCondition}
            onChange={handleInputChange}
          />
          <label htmlFor='termsCondition'>
            Check the box to agree to the terms and conditions of renting on the Rentisha platform.
          </label>
        </div>
      </div>
   
      <button className='btnHero'>Submit</button>
    </form>
    <img src={listImage} alt='inputImage'></img>
    <ToastContainer />
  </div>
  )
}

export default ListofItems;
>>>>>>> 3a5b8d91b80356179c8d14348b891af890713271
