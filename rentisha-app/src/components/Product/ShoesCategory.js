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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function YourComponent() {
//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState(''); // Set the category you want to fetch

//   useEffect(() => {
//     // Define the URL for fetching items by category
//     const apiUrl = `http://localhost:4000/ListofItemsByCategory/${category}`;

//     // Send a GET request to retrieve items by category
//     axios.get(apiUrl)
//       .then(response => {
//         setItems(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching items by category:', error);
//       });
//   }, [category]); // This effect will re-run whenever the category changes

//   return (
//     <div>
//       {/* Category selection dropdown or input field */}
//       <select value={category} onChange={(e) => setCategory(e.target.value)}>
//         <option value="">Select a category</option>
//         {/* Add options for available categories */}
//         <option value="phones">Phones</option>
//         <option value="clothes">Clothes</option>
//         <option value="Laptops">Laptops</option>
//         {/* Add more options as needed */}
//       </select>

//       {/* Display items */}
//       <ul>
//         {items.map(item => (
//           <li key={item._id}>{item.ItemName}</li>
          
//         ))}
//       </ul>
//       <div>
        
//       </div>
//     </div>
//   );
// }

// export default YourComponent;


// // components/CategoryList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CategoryList() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] =useState([])
  

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/category').then((response) => {
     
//         setProducts(response.data);
       
//       })
//       .catch(error => {
//         console.error(error);
       
//       });
//   }, []);


//   return (
//     <div>
//       <h1>Categories</h1>
//       <ul>
//         {categories.map((category) => (
//           <li key={category._id}>
//             <strong>{category.name}</strong> - {category.description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategoryList;
