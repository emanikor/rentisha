const UserModel = require("../Models/UserModel");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "rentisha supper secret key", {
    expiresIn: maxAge,
  });
};



// populated
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Fetch the user by their ID and populate their 'item' field
    const userWithItems = await UserModel.findById(userId).populate('item');
    
    // Respond with the items
    res.json(userWithItems.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user items' });
  }
});

// handle err validation
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email")
   errors.email ="that email is not registered";

   if (err.message === "incorrect password")
   errors.email ="that password is incorrect";


  if (err.message === 11000) {
    errors.password = "Email is already registered";
  }
  
  
  //  error message for"users validation failed"
  if (err.message.includes("users validation failed")) {

    // Loop through the error messages and set them in the errors object
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


module.exports.register = async (req, res, next) => {
  // signup
  try {
    const { name,  email, phone, password, confirmPassword  } = req.body;
    const user = await UserModel.create({name,  email, phone, password, confirmPassword });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.signIn = async (req, res, next) => {
//    signin
try {
  const {  email, password } = req.body;
  const user = await UserModel.SignIn(email, password);
  const token = createToken(user._id);

  res.cookie("jwt", token, {
    withCredentials: true,
    httpOnly: false,
    maxAge: maxAge * 1000,
  });

  res.status(200).json({ user: user._id, created: true });
} catch (err) {
  console.log(err);
  const errors = handleErrors(err);
  res.json({ errors, created: false });
}
};