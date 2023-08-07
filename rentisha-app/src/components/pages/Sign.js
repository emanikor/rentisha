import React, { useState } from "react";
import SignIn from '../Regristration/SignIn';
import SignUp from '../Regristration/SignUp';



function App() {
  const [currentForm, setCurrentForm] = useState('SignIn');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      
      {
        currentForm === "SignIn" ? <SignIn onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm}/>
      }
  

    </div>
  );
}

export default App;


