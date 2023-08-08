import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import './Sign.css';

const Login = (props) => {
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
  const [user, setUser] = useState('');
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:4000/SignIn", {
        ...values,
    });

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          Navigate("/");
          generateSuccess("Successfully logged in");
          setUser(data.user);
        }
      } // Log the response from the server
    } catch (err) {
      console.log(err);
      toast.error("incorrect email and password");
    }

    console.log("Form submitted");
    console.log(values);

    // Reset form after submission
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
            Already have an account? <a className="link-text" onClick={() => props.onFormSwitch("SignUp")}>
         Login here.
    
      </a>
      <ToastContainer />
        </div>
    )
}

export default Login;
