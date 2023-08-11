import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './ListOfItems.css';


const ListofItems = () => {
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
    ItemImage: null,
  };

  const [values, setValues] = useState(initialValues);
  const Navigate= useNavigate();

  const generateSuccess = (success) => toast.success(success, {
    position: "bottom-right"
  });

  const generateError = (err) => toast.error(err, {
    position: "bottom-right"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: inputValue });
  };

  const handleImageChange = (e) => {
    
    const imageFile = e.target.files[0];
    setValues({ ...values, ItemImage: imageFile });
  };

  const listSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.post("http://localhost:4000/ListofItems", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data && response.data.message) {
        generateSuccess("Item listed successfully");
        setValues(initialValues);
        Navigate.push(`/product/${response.data.itemId}`);
      } else {
        generateError("Failed to list item");
      }
    } catch (err) {
      console.log(err);
      generateError("An error occurred");
    }
  };
  return (
    <div className='listInput'>
        
    <form onSubmit={listSubmit} >
    <h2 className='headProduct paddings'>List of Items page</h2>


    <input
          type="file"
          name="ItemImage"
          accept="image/*"
          onChange={handleImageChange}
        />


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
    
    <ToastContainer />
  </div>
  )
}

export default ListofItems;
