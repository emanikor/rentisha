// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './View.css';
// import pixel from '../images/pixel.jpg';
// import ProductDetail from '../Product/ProductDetail';

// const ViewItem = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { itemId } = useParams();
//   const {productId} = useParams();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/ListofItems/${itemId}`)
//       .then((response) => {
//         console.log(response.data);
//         setProduct(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, [itemId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }


//   useEffect(() => {
//     console.log('productId:', productId);
//     axios.get(`http://localhost:4000/api/products/${productId}`)
//       .then(response => {
//         console.log('Response data:', response.data);
//         setProduct(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setLoading(false);
//       });
//   }, [productId]);

  
//   return (
//     <div className='item-profile'>
//       <div className='item-card'>
//         <img src={pixel} alt={product.ItemName} />
//         <h3>{product.ItemName}</h3>
//         <p>{product.ItemDescription}</p>
//         <p>Price: ${product.ItemPrice}</p>
//       </div>
//       <div className='product-details-container'>
//         <ProductDetail />
//       </div>
//     </div>
//   );
// };

// export default ViewItem;
