
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryDetail = () => {
  const { categoryId } = useParams();

  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/categories/${categoryId}`)
      .then(response => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [categoryId]); 

  return (
    <div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div>
          <h2>Category Details</h2>
          <div>Name: {category.name}</div>
        
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
