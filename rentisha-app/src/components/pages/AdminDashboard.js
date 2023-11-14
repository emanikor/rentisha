// import React from 'react'
// import Dashboard from '../Dashboards/Dashboard'
// import AdminSidebar from '../adminSidebar/AdminSide';


// function AdminDashboard() {
//   return (
//     <div>
//         <Dashboard/>
//         <AdminSidebar/>
//     </div>
//   )
// }

// export default AdminDashboard;

// import React, { useState } from 'react';
// import AdminSidebar from '../adminSidebar/AdminSide';
// import CategoryForm from '../Dashboards/CategoryForm';

// const Admin = () => {
//   const [showCategoryForm, setShowCategoryForm] = useState(false);

//   const handleCategoryFormToggle = (value) => {
//     setShowCategoryForm(value);
//   };

//   return (
//     <div className="admin-panel">
//       <AdminSidebar onCategoryFormToggle={handleCategoryFormToggle} />
//       <CategoryForm displayForm={showCategoryForm} />
//     </div>
//   );
// };

// export default Admin;

import { useState } from 'react';
import './App.css';
import Header from '../Navbar/Header';
import Sidebar from '../Navbar/Sidebar';
import Home from '../Dashboards/Home';
// import CategoryForm from '../Dashboards/CategoryForm';
// import userForm from '../Dashboards/userForm';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleFormDisplay = (formType) => {
    if (formType === 'CategoryForm') {
      setShowCategoryForm(true);
      setShowUserForm(false);
    } else if (formType === 'UserForm') {
      setShowUserForm(true);
      setShowCategoryForm(false);
    } else {
      setShowCategoryForm(false);
      setShowUserForm(false);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} showCategoryForm={showCategoryForm} handleFormDisplay={handleFormDisplay} />
      <Home showCategoryForm={showCategoryForm} showUserForm={showUserForm} />
    </div>
  );
}

export default App;
