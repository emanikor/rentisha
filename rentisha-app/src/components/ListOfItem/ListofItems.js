import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './ListOfItems.css';
import { useParams } from 'react-router-dom';
import listImage from '../images/listImage.jpg'
import { useLocation } from 'react-router-dom';


const ListofItems = ({ listItemsHandler }) => {
const location = useLocation();
  const item = location.state ? location.state.item : null;
  

  const numImageInputs = 4;

  const initialValues = {
    ItemImages: item ? item.ItemImages : new Array(numImageInputs).fill(null),
    ItemName: item ? item.ItemName : '',
    ItemDescription: item ? item.ItemDescription : '',
    ItemType: item ? item.ItemType : '',
    ItemPrice: item ? item.ItemPrice : '',
    DropAddress: item ? item.DropAddress : '',
    Date: item ? item.Date : '',
    Time: item ? item.Time : '',
    FirstName: item ? item.FirstName : '',
    SecondName: item ? item.SecondName : '',
    PhoneNumber: item ? item.PhoneNumber : '',
    TermsCondition: item ? item.TermsCondition : false,
   
  };


 

  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  

  const [file, setFile] = useState(null);
 




  const [files, setFiles] = useState(new Array(numImageInputs).fill(null));

  const generateSuccess = (success) => toast.success(success, {
    position: "bottom-right"
  });

  const generateError = (err) => toast.error(err, {
    position: "bottom-right"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    console.log(inputValue)
    setValues({ ...values, [name]: inputValue });
    console.log(name)
    console.log(values)

    const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  const inputValue = type === "checkbox" ? checked : value;

  // Set the selected value for ItemType
  if (name === "ItemType") {
    setValues({ ...values, ItemType: inputValue });
  } else {
    setValues({ ...values, [name]: inputValue });
  }
};

  };

  // const handleImageChange = (e) => {
  //   const imageFile = e.target.files[0];
  //   setValues({ ...values, ItemImage: imageFile });
  // };

  
  const [imagePreview, setImagePreview] = useState(null);

  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
  
      // Set the selected file to the state
      setFile(selectedFile);
    }
  };
  


  const listSubmit = async (e) => {
    e.preventDefault();

    

    files.forEach((file, index) => {
      if (file) {
        formData.append(`ItemImage_${index}`, file);
      }
    });

    // form data 
    const formData = new FormData();
    formData.append('ItemImage', file);
    formData.append('ItemName', values.ItemName); 
    formData.append('ItemDescription', values.ItemDescription);
    formData.append('ItemType', values.ItemType);
    formData.append('ItemPrice', values.ItemPrice);
    formData.append('DropAddress', values.DropAddress);
    formData.append('Date', values.Date);
    formData.append('Time', values.Time);
    formData.append('FirstName', values.FirstName);
    formData.append('SecondName', values.SecondName);
    formData.append('PhoneNumber', values.PhoneNumber);
    formData.append('TermsCondition', values.TermsCondition); 
   

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {

      let response;
      if (editingItem) {
       
        response = await axios.put(`http://localhost:4000/api/items/${editingItem._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // If not editing, make a POST request to create a new item
        response = await axios.post("http://localhost:4000/ListofItems", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      
    
  //     if (response.status === 201) {
  //       generateSuccess("Item listed successfully");
  //       // listItemsHandler({
  //       //   id: response.data.itemId,
  //       //   ...values,
  //       //   quantity: 1,
  //       // });
       
        
  //       navigate(`/checkout/${response.data._id}`);
       

  //       setValues(initialValues);
  //     } else {
  //       generateError("Failed to list item");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     generateError("An error occurred");
  //   }

  // };
    
  if (response.status === 201 || response.status === 200) {
    generateSuccess(editingItem ? "Item updated successfully" : "Item listed successfully");
    // Reset the form and other state if needed
    setValues(initialValues);
    setEditingItem(null);

    navigate(`/checkout/${response.data._id}`);
  } else {
    generateError("Failed to list/update item");
  }
} catch (err) {
  console.error(err);
  generateError("An error occurred");
}
};

  return (
    <div className='listInput'>
        
    <form onSubmit={listSubmit} >
    <h2 className='headProduct paddings'>List of Items page</h2>

    
    <div className="inputImages">
              <input
                type="file"
                name="ItemImage"
                accept="image/*"
                className="imagesstyle"
                onChange={handleImageChange}
                multiple={false}
              />
              <input
                type="file"
                name="ItemImage"
                accept="image/*"
                className="imagesstyle"
                onChange={handleImageChange}
                multiple={false}
              />
              <input
                type="file"
                name="ItemImage"
                accept="image/*"
                className="imagesstyle"
                onChange={handleImageChange}
                multiple={false}
              />
              <input
                type="file"
                name="ItemImage"
                accept="image/*"
                className="imagesstyle"
                onChange={handleImageChange}
                multiple={false}
              />

</div>
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
      <select
      className="inputcat"
        name='ItemType'
        value={values.ItemType}
        onChange={handleInputChange}
      >
        <option value=''>Select category</option>
        <option value='phones'>Phones</option>
        <option value='clothes'>Clothes</option>
        <option value='drone'>Drone</option>
        <option value='laptops'>Laptops</option>
        <option value='cameras'>Cameras</option>
        <option value='cameras'>Tvs</option>
        <option value='cameras'>Gym equipment</option>
      </select>

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
            name='TermsCondition'
            id='termsCondition'
            checked={values.TermsCondition}
            onChange={handleInputChange}
          />
          <label htmlFor='termsCondition'>
            Check the box to agree to the terms and 
            conditions of renting on the Rentisha platform.
          </label>
        </div>
      </div>

      <button className='btnHero' type="submit">
          {editingItem ? 'Save Changes' : 'Submit'}
        </button>
    </form>
    {editingItem && (
        <button  className="btnHero" onClick={() => setEditingItem(null)}>Cancel Editing</button>
      )}
    <ToastContainer />
    <div>
      <img src={listImage}></img>
    </div>
  </div>
  )
    }
export default ListofItems;