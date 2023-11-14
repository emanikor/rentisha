import React, { useState } from 'react';

const AdminSidebar = ({ onCategoryFormToggle }) => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const toggleCategoryForm = () => {
    setShowCategoryForm(!showCategoryForm);
    onCategoryFormToggle(!showCategoryForm); // Passes the form display state to the parent component
  };

  return (
    <div className="sidebar">
      <h2 className='admin'>Admin Panel</h2>
      <button onClick={toggleCategoryForm}>Create Category</button>
    </div>
  );
};

export default AdminSidebar;
