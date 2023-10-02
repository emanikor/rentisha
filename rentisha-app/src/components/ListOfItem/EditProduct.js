import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductEdit() {
  const { productId } = useParams();
  const{itemId} =useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({}); // Store form data

  useEffect(() => {
    // Fetch the product data by productId and populate the form
    axios.get(`http://localhost:4000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setFormData({
          title: response.data.title,
          // Populate other form fields similarly
        });
      })
      .catch(error => {
        console.error(error);
        // Handle errors
      });
  }, [productId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send edited data to the server using axios or your preferred method
    // Redirect back to the product detail page after editing
    navigate(`/checkout/${itemId}`);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Populate form fields with formData */}
        <input type="text" name="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        {/* Add other form fields similarly */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProductEdit;
