// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import category1 from '../images/category1.png';
// import Footer from '../Footer/Footer';

// const ProductDetail = () => {
//   // Get the productId from the URL
//   const { productId } = useParams();
  
//   // State variables to store product and related product data
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [items, setItems] = useState([]);
  
//   // State variable to track loading status
//   const [loading, setLoading] = useState(true);
  
//   // Access item data from location state (passed from ProductListing component)
//   const location = useLocation();
//   const item = location.state ? location.state.item : null;

//   // Log the productId for debugging purposes
//   console.log('Product ID from URL:', productId);

//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/products/${productId}`)
//       .then(response => {
//         setProduct(response.data);
//         setLoading(false);
  
//         // Once the product data is loaded, fetch related products for its category
//         axios.get(`http://localhost:4000/ListofItemsByCategory/${response.data.Title}`)
//           .then(relatedResponse => {
//             setRelatedProducts(relatedResponse.data);
//           })
//           .catch(error => {
//             console.error('Error fetching related products:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error fetching product details:', error);
//         setLoading(false);
//       });
//   }, [productId]);

//   useEffect(() => {
//     // Fetch data from the /ListofItems endpoint
//     axios.get('http://localhost:4000/ListofItems')
//       .then(response => {
//         setItems(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching items:', error);
//       });
//   }, []);

//   // Render loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Render product details
//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="product-detail">
//       <div className="product-container">
//         <div className="product-category">
//           <div className="detail-body">
//             <h2>{product.Title}</h2>
//             <p>Category: {product.Cat}</p>
//             <p>Price: {product.Price}</p>
//           </div>
//           <div className="product-image">
//             <img src={category1} className="productstyle" alt={product.Title} />
//           </div>
//         </div>
//       </div>
//       <h3 className="flexCenter secondaryText">Related Products:</h3>
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
             
            
//         <div className="fetched-items">
//           {items.map(item => (
//               <Link
//               key={item._id}
//                to={`/checkout/${item._id}`} 
//             >
//             <div key={item._id} className="card">
//               <img src={item.ItemImage} alt={item.ItemName} />
//               <h3 className="item-name">{item.ItemName}</h3>
//               <p className="item-description">{item.ItemDescription}</p>
//               <p className="item-price">${item.ItemPrice}</p>
//             </div>
//             </Link>
//           ))}
//         </div>
       
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;


// // ProductList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import Footer from '../Footer/Footer';

// function ProductDetail() {
//   const { category } = useParams();
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   useEffect(() => {
//     // Fetch related items by category
//     axios.get(`http://localhost:4000/ListofItemsByCategory/${category}`)
//       .then(relatedResponse => {
//         setRelatedProducts(relatedResponse.data);
//       })
//       .catch(error => {
//         console.error('Error fetching related products:', error);
//       });
//   }, [category]);

//   return (
//     <div>
//       <div className="fetched-items">
//         {relatedProducts.map(item => (
//           <Link key={item._id} to={`/checkout/${item._id}`}>
//             <div key={item._id} className="card">
//               <img src={item.ItemImage} alt={item.ItemName} />
//               <h3 className="item-name">{item.ItemName}</h3>
//               <p className="item-description">{item.ItemDescription}</p>
//               <p className="item-price">${item.ItemPrice}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default ProductDetail;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function YourComponent() {
//   const {category } = useParams();
//    const [items, setItems] = useState([]);
//   const [categoryy, setCategoryy] = useState(''); // Set the category you want to fetch

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
//       <select value={category} onChange={(e) => setCategoryy(e.target.value)}>
//         <option value="">Select a category</option>
//         {/* Add options for available categories */}
//         <option value="Phones">Phones</option>
//         <option value="Clothes">Clothes</option>
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link, useLocation } from 'react-router-dom';
// import './Product.css';

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [product, setProduct] = useState([]);
//   const [category, setCategory] = useState('');
//   const [categories, setCategories] = useState([]);


//   const [items, setItems] = useState([]);

//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     // Fetch the list of available categories from your MongoDB server
//     axios.get('http://localhost:4000/api/category')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);


//   useEffect(() => {
//     // Fetch all products initially
//     axios.get('http://localhost:4000/ListofItems')
//       .then(response => {
//         setProduct(response.data);
//         setFilteredProducts(response.data); // Initially, set filtered products to all products
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     if (category) {
//       // Fetch products based on the selected category
//       axios.get(`http://localhost:4000/ListofItemsByCategory/${category}`)
//         .then(response => {
//           setFilteredProducts(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     } else {
//       // If no category is selected, show all products
//       setFilteredProducts(products);
//     }
//   }, [category, products]);
  

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   return (
//     <div>
//       <h2>Products by Category</h2>
//       <div>
//         <label htmlFor="categorySelect">Select a Category:</label>
//         <select id="categorySelect" onChange={handleCategoryChange}>
//           <option value="">-- Select Category --</option>
//           {categories.map(category => (
//             <option key={category._id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="fetched-items">
//           {items.map(item => (
//               <Link
//               key={item._id}
//                to={`/checkout/${item._id}`} 
//             >
//             <div key={item._id} className="card">
//               <img src={item.ItemImage} alt={item.ItemName} />
//               <h3 className="item-name">{item.ItemName}</h3>
//               <p className="item-description">{item.ItemDescription}</p>
//               <p className="item-price">${item.ItemPrice}</p>
//             </div>
//             </Link>
//           ))}
//         </div>
//         <div className="fetched-items">
//   {filteredProducts.map(product => (
//     <Link
//       key={product._id}
//       to={`/checkout/${product._id}`}
//     >
//       <div key={product._id} className="card">
//         <img src={product.ItemImage} alt={product.ItemName} />
//         <h3 className="item-name">{product.ItemName}</h3>
//         <p className="item-description">{product.ItemDescription}</p>
//         <p className="item-price">${product.ItemPrice}</p>
//       </div>
//     </Link>
//   ))}
// </div>

//     </div>
//   );
// }

// export default ProductList;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductList= () => {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`http://localhost:4000/ListofItemsByCategory/${category}`)
//       .then(response => {
//         setProducts(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, [category]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }


//   return (
//         <div>
//           <h2>Products by Category</h2>
//           <div>
           
//           </div>
//           <ul>
//             {products.map(product => (
//               <li key={product._id}>{product.name}</li>
//             ))}
//           </ul>
//         </div>
//       );
//     }
    
//     export default ProductList;



