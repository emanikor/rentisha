import React, { useState } from "react";
import SignIn from '../Regristration/SignIn';
import SignUp from '../Regristration/SignUp';
import Profile from "../Regristration/Profile";
import Footer from "../Footer/Footer";

function App() {
  const [currentForm, setCurrentForm] = useState('SignIn');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {currentForm === "SignIn" && <SignIn onFormSwitch={toggleForm} />}
      {currentForm === "SignUp" && <SignUp onFormSwitch={toggleForm} />}
      {currentForm === "Profile" && <Profile />}
      <Footer/>
    </div>
  );
}

export default App;
