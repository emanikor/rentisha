import React, { useState } from 'react';
import './Rent.css'
import shoes from '../images/shoes.jpg'

const ProductListing = (props) => {
  const [products, setProducts] = useState(props.products);
  const [editingItemId, setEditingItemId] = useState(null);


  const handleEditClick = (itemId) => {
    setEditingItemId(itemId);
  };
  const handleSaveClick = (itemId) => {
   
    setEditingItemId(null);
  };

  const handleQuantityChange = (e, itemId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === itemId) {
        return {
          ...product,
          quantity: parseInt(e.target.value, 10) || 0,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

 
    console.log(props);
   
    const renderList = props.products.map((listitems) => {
      const totalPrice = parseFloat(listitems.ItemPrice) * listitems.quantity || 0;


      
      return (
        <div className="products">
        <div className="paddings flexCenter productlist-Container">
          <div className="paddings productlist-content">
            <div style={{ display: "flex" }}>
              <div className="product-image">
                <img src={shoes} alt={listitems.ItemName} /> 
              </div>
              <div className="paddings product-details">
                <h1 className='listHeader '>{listitems.ItemName}</h1>
                <p className='listdes'>{listitems.ItemDescription}</p>
                <h3 className='itemtype'>{listitems.ItemType}</h3>
                <span className='itemprice'>{listitems.ItemPrice}</span>
                <div className='address'>{listitems.DropAddress}</div>
                <span>{listitems.Time}</span>
               
                <div className="quantity">
                  <label>Quantity:</label>
                  <input type="number"
                   value={listitems.quantity} 
                   onChange={(e) => 
                   handleQuantityChange(e, listitems)} />
                </div>
                <div>
                  <h3 className='paddings'>Total: ${totalPrice.toFixed(2)}</h3>
                </div>
                <div className=''>
                  <button className='btnHero'>checkout </button>
                </div>
                {editingItemId === listitems.id ? (
                  <button onClick={() => handleSaveClick(listitems.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(listitems.id)}>Edit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      );
    });
    
  
    
  return (
    <div className="product-listing">
      
      <h2>Product Listing</h2>
      {/* <div className="products">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Link>
          </div>
        ))}
      </div> */}
      <div>{renderList}</div>
    </div>
  );
};

export default ProductListing;
