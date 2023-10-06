// import React, { useState, useEffect } from 'react';
// import { useParams, Link,useLocation  } from 'react-router-dom';
// import axios from 'axios';
// import category1 from '../images/category1.png';
// import Footer from '../Footer/Footer';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const item = location.state ? location.state.item : null;


//   console.log('Product ID from URL:', productId);


//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/products/${productId}`)
//       .then(response => {
//         setProduct(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, [productId]);

//   useEffect(() => {
//     if (product) {
//       axios.get(`http://localhost:4000/api/related-products/${product.Title}`)
//         .then(response => {
//           setRelatedProducts(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }, [product]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }


//   return (
//     <div className=" product-detail">
//       <div className='product-container'>
//       <div className='product-category'>
        
//       <div className='detail-body'>
//       <h2>{product.Title}</h2>
//       <p>Category: {product.Cat}</p>
//       <p>Price: {product.Price}</p>
//       </div>
//       <div className='product-image'>
//         <img src={category1} className='productstyle' alt={product.Title} />
//       </div>
//       </div>
//       </div>
//       <h3 className='flexCenter secondaryText'>Related Products:</h3>
//       <div className="related-products">
//         {relatedProducts.map(relatedProduct => (
//           <Link
//             key={relatedProduct.id}
//             to={`/product/${relatedProduct.id}`}
//             className="related-product"
//           >
//             <div className="related-product-container">
//               <img src={category1} alt={relatedProduct.Title} />
//               <p>{relatedProduct.Title}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default ProductDetail;