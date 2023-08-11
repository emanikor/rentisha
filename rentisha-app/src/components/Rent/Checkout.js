import React, { useState } from 'react';
import '../component.css'; // Make sure to have your CSS file imported

function CartReview() {
  const initialCartItems = [
    { id: 1, name: 'Laptop', price: 800 },
    { id: 2, name: 'Headphones', price: 100 },
    { id: 3, name: 'Mouse', price: 20 }
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className='CartReview'>
      <h2>Your Cart Review</h2>
      <ul className='cart-list'>
        {cartItems.map(item => (
          <li key={item.id} className='cart-item'>
            <div className='item-details'>
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className='total'>
        <p>Total:</p>
        <p>${getTotalCost()}</p>
      </div>
    </div>
  );
}

export default CartReview;
