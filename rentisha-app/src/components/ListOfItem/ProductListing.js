import React from 'react';
import './Rent.css'; 
// Import your custom CSS file for styling
import pixel from '../images/pixel.jpg'

const ProductListing = ({ products }) => {
  console.log('Received products:', products);

  return (
    <div className="product-listing">
      {/* <h2 className='flexCenter'>Product Listing</h2> */}
      {products.map((item) => (
        <div key={item._id} className="productlist">
          
          <div className="product-image">
            <img src={pixel} alt={item.ItemName} />
            <div className="map">
              {/* Google Maps Embed */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31910.512857466783!2d36.7766569297952!3d-1.2855327165954584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a3dc8a2425%3A0x94e48314489213d4!2sYaya%20Centre!5e0!3m2!1sen!2ske!4v1693178282318!5m2!1sen!2ske" width="100%" height="450"  className="mapframe" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="seller-info">
              <h4>Seller's Information</h4>
              <p>{item.FirstName} {item.SecondName}</p>
              <p >Phone: {item.PhoneNumber}</p>
            </div>
          </div>
      
          <div className="product-details">
            <h3 className="item-name">{item.ItemName}</h3>
            <p className="item-description">{item.ItemDescription}</p>
            <div className='Price-section'>
              <p className="item-type">{item.ItemType}</p>
              <p className="item-price">${item.ItemPrice}</p>
              <div className='price-items'>
                <p className="drop-address">{item.DropAddress}</p>
                <p className="time">{item.Time}</p>
              </div>
            </div>
            
            <div className="buttons">
              <button className='btnHero'>
                Check Item Availability
              </button>
              <button className='btnHero edit'>
                Edit Listing
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
