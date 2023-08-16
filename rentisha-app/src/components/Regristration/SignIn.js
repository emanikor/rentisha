import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './Sign.css';


export const SignIn = (props) => {
  const Navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const generateSuccess = (success) => toast.success(success, {
    position: "bottom-right"
  });

  const generateError = (err) => toast.error(err, {
    position: "bottom-right"
  });

  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:4000/SignIn", {
        ...values,
 
      });
      
      if (data && data.signedIn) {
        generateSuccess("Successfully signed in.");
        
        if (data.user && data.token) {
          
          document.cookie = `jwt=${data.token}; path=/; secure; SameSite=strict;`;
          Navigate('/list'); 
        } else {
          console.log("User data or token not available in response.");
        }
      } else {
        generateError("Invalid credentials.");
      }
    } catch (err) {
      console.log(err);
      generateError("An error occurred.");
    }

    console.log("Form submitted");
    console.log(values);
 
    // reset
    setValues(initialValues);
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      Already have an account?{" "}
      <a className="link-text" onClick={() => props.onFormSwitch("SignUp")}>
        Sign up here.
      </a>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
