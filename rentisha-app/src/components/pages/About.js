import React, { useState } from 'react';
import axios from 'axios';

function About() {
  const [category, setCategory] = useState({ name: '', description: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/category', category);
      setSuccessMessage('Category added successfully'); // Set success message
      setErrorMessage(''); // Clear any previous error message
      console.log(response.data);
    } catch (error) {
      setSuccessMessage(''); // Clear any previous success message
      setErrorMessage('Error adding category'); // Set error message
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={category.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={category.description} onChange={handleChange} required />
      </div>
      <button type="submit">Add Category</button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default About;
