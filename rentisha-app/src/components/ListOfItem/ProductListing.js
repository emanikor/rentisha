import React, { useState } from 'react';
import './Rent.css';
import { Link, useNavigate } from 'react-router-dom';

// Import the sample encoded image
import pixel from '../images/pixel.jpg'; // Replace 'sampleImage1' with your actual file path

const ProductListing = ({ products }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % products[selectedImageIndex].ItemImage.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + products[selectedImageIndex].ItemImage.length) % products[selectedImageIndex].ItemImage.length);
  };

  const openItemPreview = (itemId) => {
    // Construct the URL for viewing the item
    const viewItemUrl = `/view-item/${itemId}`;
    
    // Open the item in a new tab or window
    window.open(viewItemUrl, '_blank');
  };

  // editing
  
  const handleEditClick = (itemId) => {
    // Navigate to the form route with the item ID as a parameter
    navigate(`/list/${itemId}`);
  };

  return (
    <div className="product-listing">
      {products.map((item, index) => (
        <div key={item._id} className="productlist">
          <div className="product-image">
            <div className="main-image-container">
              {/* Use the sample encoded image */}
              <img src={pixel} alt={item.ItemName} className="main-image" />
              <div className='allimages'>
                {Array.isArray(item.ItemImage) && (
                  <div className="image-gallery">
                    {item.ItemImage.map((image, idx) => (
                      // Use the sample encoded image
                      <img
                        key={idx}
                        src={pixel} // Replace with your actual image source when available
                        alt={item.ItemName}
                        className={`thumbnail ${selectedImageIndex === idx ? 'selected' : ''}`}
                        onClick={() => handleImageClick(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="small-images-row">
                {Array.isArray(item.ItemImage) && (
                  <div className="small-image-gallery-row">
                    {item.ItemImage.map((image, idx) => (
                      // Use the sample encoded image
                      <img
                        key={idx}
                        src={pixel} // Replace with your actual image source when available
                        alt={item.ItemName}
                        className={`small-thumbnail-row ${selectedImageIndex === idx ? 'selected' : ''}`}
                        onClick={() => handleImageClick(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {item.FirstName && item.SecondName && (
              <div className="seller-info">
                <h4>Seller's Information</h4>
                <p>{item.FirstName} {item.SecondName}</p>
                <p>Phone: {item.PhoneNumber}</p>
              </div>
            )}
            <div className="navigation-arrows">
              {item.ItemImage && item.ItemImage.length > 1 && (
                <React.Fragment>
                  <button className="prev" onClick={handlePrevImage}>
                    &#8249;
                  </button>
                  <button className="next" onClick={handleNextImage}>
                    &#8250;
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="description">
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
              
              <button
  className="btnHero1"
  onClick={() => openItemPreview(item._id)}
>
  View Item
</button>

              <button className="edit" onClick={() => handleEditClick(item._id)}>
            Edit Listing
          </button>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
