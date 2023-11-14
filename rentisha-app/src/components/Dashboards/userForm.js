// // UserForm.js


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import './Dashboard.css';
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UserForm = () => {
//   const Navigate = useNavigate();
//   const initialValues = {
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const generateSuccess = (success) => toast.success(success, { position: "bottom-right" });
//   const generateError = (err) => toast.error(err, { position: "bottom-right" });

//   const [user, setUser] = useState('');
//   const [values, setValues] = useState(initialValues);

//   // setting a strong password
//   const isStrongPassword = (password) => {
//     const minPasswordLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /\d/.test(password);
//     const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
  
//     return (
//       password.length >= minPasswordLength &&
//       hasUpperCase &&
//       hasLowerCase &&
//       hasNumbers &&
//       hasSpecialChars
//     );
//   };

//   const [users, setUsers] = useState([]);
//       useEffect(() => {
//           // Replace the URL with the actual API endpoint to fetch users
//           axios.get('http://localhost:4000/users')
//             .then((response) => {
//               setUsers(response.data);
//             })
//             .catch((error) => {
//               console.error('Error fetching users:', error);
//             });
//         }, []);
//         const handleSubmit = async (e) => {
//           e.preventDefault();
      
//           // Check if passwords match
//           if (values.password !== values.confirmPassword) {
//             generateError("Password and Confirm Password do not match");
//             return;
//           }
      
//           if (!isStrongPassword(values.password)) {
//             generateError("Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.");
//             return; 
//           }
          
//           try {
//             const { data } = await axios.post("http://localhost:4000/SignUp", {
//               ...values,
      
              
//             });
          
//             if (data) {
//               if (data.errors) {
//                 const { email, password } = data.errors;
//                 if (email) generateError(email);
//                 else if (password) generateError(password);
//               } else {
//                 generateSuccess("Successfully registered.");
       
//                 if (data.user) {
//                   setUser(data.user);
//                   document.cookie = `jwt=${data.token}; path=/; secure; SameSite=strict;`;
//                   Navigate('/');
//                 } else {
//                   console.log("User data not available in response.");
                  
//                 }
//               }
//             }
//           } catch (err) {
//             console.log(err);
//             toast.error("Email is already registered.");
//           }
          
      
//         console.log("Form submitted");
//         console.log(values);
//           // Reset form after submission
//           setValues(initialValues);
//         };

//   return (
//     <form>
      
//       <div className="auth-form-container">
//       <h2 className="paddings">Register Your Account Here</h2>
//       <form className="register-form" onSubmit={handleSubmit}>
//       <label htmlFor="name">Full name</label>
//         <input
//           name="name"
//           id="name"
//           placeholder="Full Name"
//          required
//           value={values.name}
//           onChange={(e) =>
//             setValues({ ...values, [e.target.name]: e.target.value })
//           }
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           placeholder="youremail@gmail.com"
//           id="email"
//           name="email"
//           required
//           value={values.email}
//           onChange={(e) =>
//             setValues({ ...values, [e.target.name]: e.target.value })
//           }
//         />

//         <label htmlFor="phone">Phone no:</label>
//         <input
//           type="number"
//           placeholder="Enter Your Phone no..."
//           id="phone"
//           name="phone"
//           required
//           value={values.phone}
//           onChange={(e) =>
//             setValues({ ...values, [e.target.name]: e.target.value })
//           }
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           placeholder="********"
//           id="password"
//           name="password"
//           required
//           value={values.password}
//           onChange={(e) =>
//             setValues({ ...values, [e.target.name]: e.target.value })
//           }
//         />

//         <label htmlFor="confirmPassword">Confirm password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           id="confirmPassword"
//           name="confirmPassword"
//           required
//           value={values.confirmPassword}
//           onChange={(e) =>
//             setValues({ ...values, [e.target.name]: e.target.value })
//           }
//         />

//         <button className="reg-btn" type="submit">
//           Submit
//         </button>
//         <div>
//             <h2>User List</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.id}</td>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       <button>Edit</button>
//                       <button>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </form>
//       </div>
//     </form>
//   );
// };

// export default UserForm;


// import logo from './logo.svg';
// import './App.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Formuser from '../Dashboards/Formuser';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './cat.css';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  const Navigate = useNavigate();
  const [formData,setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
            
  })
  const [formDataEdit,setFormDataEdit] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    _id : ""
  })
  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }



  
    const generateSuccess = (success) => toast.success(success, { position: "bottom-right" });
  const generateError = (err) => toast.error(err, { position: "bottom-right" });

  const [user, setUser] = useState('');
  const [values, setValues] = useState('');

  // setting a strong password
  const isStrongPassword = (password) => {
    const minPasswordLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
  
    return (
      password.length >= minPasswordLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  };

  const handleSubmit = async (e) => {
              e.preventDefault();
          
              // Check if passwords match
              if (values.password !== values.confirmPassword) {
                generateError("Password and Confirm Password do not match");
                return;
              }
          
              if (!isStrongPassword(values.password)) {
                generateError("Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.");
                return; 
              }
              
              try {
                const { data } = await axios.post("http://localhost:4000/adminSignUp", {
                  ...values,
          
                  
                });
              
                if (data) {
                  if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                  } else {
                    generateSuccess("Successfully registered.");
           
                    if (data.user) {
                      setUser(data.user);
                      document.cookie = `jwt=${data.token}; path=/; secure; SameSite=strict;`;
                      Navigate('/');
                    } else {
                      console.log("User data not available in response.");
                      
                    }
                  }
                }
              } catch (err) {
                console.log(err);
                toast.error("Email is already registered.");
              }
              
          
            console.log("Form submitted");
            console.log(values);
              // Reset form after submission
              // setValues(initialValues);
            };

  const getFetchData = async()=>{
    const data = await axios.get("http://localhost:4000/users")
    console.log(data)
    if(data.data.success){
        setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

  const handleDelete = async(id)=>{
    const data = await axios.delete("http://localhost:4000/userdelete/"+id)
    
      if(data.data.success){
        getFetchData()
        alert(data.data.message)
      }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("http://localhost:4000/userupdate",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }
  const handleEditOnChange = async(e)=>{
    const {value,name} = e.target
    setFormDataEdit((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }
  const handleEdit = (el)=>{
    setFormDataEdit(el)
    setEditSection(true)
  }
  return (
   <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

      {
        addSection && (
          < Formuser 
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose = {()=>setAddSection(false)}
            rest={formData}
          />
        )
      }
      {
        editSection && (
          < Formuser 
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose = {()=>setEditSection(false)}
            rest={formDataEdit}
          />
        )
      }


      <div className='tableContainer'>
      <table>
          <thead>
            <tr>
              
              <th>Id</th>
              <th>Names</th>
              <th>Emails</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            { dataList[0] ? (
              dataList.map((el,id)=>{
                console.log(el)
                return(
                  <tr>
                    <td>{id}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    
                    
                    <td>
                      <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                      <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                )
              }))
              : (
                <p style={{textAlign : "center"}}>No data</p>
              )
            }
          </tbody>
        </table>
      </div>
     


      </div>
   </>
  );
}

export default App;