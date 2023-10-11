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


// ProductList.js
// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

function ProductDetail() {
  const { category } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items by the fixed category 'phones'
    axios.get(`http://localhost:4000/ListofItemsByCategory?ItemType=phones`)
      .then(relatedResponse => {
        setRelatedProducts(relatedResponse.data);
      })
      .catch(error => {
        console.error('Error fetching related products:', error);
      });
  }, [category]);

  return (
    <div>
      <div className="fetched-items">
        {relatedProducts.map(item => (
          <Link key={item._id} to={`/checkout/${item._id}`}>
            <div key={item._id} className="card">
              <img src={item.ItemImage} alt={item.ItemName} />
              <h3 className="item-name">{item.ItemName}</h3>
              <p className="item-description">{item.ItemDescription}</p>
              <p className="item-price">${item.ItemPrice}</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;

