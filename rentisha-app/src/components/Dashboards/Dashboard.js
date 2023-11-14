// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const UserList = () => {

//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         // Replace the URL with the actual API endpoint to fetch users
//         axios.get('http://localhost:4000/users')
//           .then((response) => {
//             setUsers(response.data);
//           })
//           .catch((error) => {
//             console.error('Error fetching users:', error);
//           });
//       }, []);


//   return (
//     <div>
//       <h2>User List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);

//   // Fetch user data when the component mounts
//   useEffect(() => {
//     axios.get('/admin/users') // Replace with your API endpoint
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });as
//   }, []);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>

//       {/* Display the UserList component */}
//       <UserList users={users} />

//       {/* Add more admin functionality and components here */}
//     </div>
//   );
// };

// export default AdminDashboard;

// AdminDashboard.js

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [data, setData] = useState('');

//   useEffect(() => {
//     axios.get('/admin')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>{data}</p>
//       <p>qbhuhqeuifhecfue cuwebcfwu8rfbwcibu8bcrrrrqw8ru</p>
//       {/* Add more admin functionality and components here */}
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react';
import './Dashboard.css';
const Dashboard = () => {
  // Sample statistics or data for the dashboard
  const userCount = 100;
  const categoryCount = 10;
  const totalSales = 5000;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-box">
          <h2>Users</h2>
          <p>{userCount}</p>
        </div>
        <div className="stat-box">
          <h2>Categories</h2>
          <p>{categoryCount}</p>
        </div>
        <div className="stat-box">
          <h2>Total Sales</h2>
          <p>${totalSales}</p>
        </div>
      </div>
      {/* Add more components or widgets as needed */}
    </div>
  );
};

export default Dashboard;
