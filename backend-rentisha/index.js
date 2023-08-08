// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const UserModel = require("./Models/UserModel");
// const ItemModel = require("./ItemModel/ItemModel");
// const jwt = require("jsonwebtoken");

// const app = express();
// const PORT = 4000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/jwt", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB connection successful");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//   const jwtSecret = "rentisha 2023 key";  


// // User Registration Endpoint
// app.post("/SignUp", async (req, res) => {
//   try {
//     // registration logic
//     const { name, email, phone, password, confirmPassword } = req.body;

//     // Compare password and confirmPassword
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     // Check if the email is already registered
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: "Email is already registered" });
//     }

//     // Create a new user document
//     const newUser = new UserModel({
//       name,
//       email,
//       phone,
//       password,
//       confirmPassword,
//     });

//     // Hash the password before saving to the database
//     const salt = await bcrypt.genSalt();
//     newUser.password = await bcrypt.hash(newUser.password, salt);

//     // Save the user to the database
//     await newUser.save();

//   // generate  jwt tokens 
// const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
//   expiresIn: "3d", 
// });

// res.cookie("jwt", token, {
//   httpOnly: true, 
//   maxAge: 3 * 24 * 60 * 60 * 1000, 
//   secure: true, 
// });


// res.status(201).json({ user: newUser._id, created: true });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // User (Sign-in) Endpoint
// app.post("/SignIn", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }

//     // Find the user by email in the database
//     const user = await UserModel.findOne({ email });

//     // Check if the user with the given email exists
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id }, jwtSecret, {
//       expiresIn: "3d", // Token expiration time
//     });

//     res.cookie("jwt", token, {
//       httpOnly: true, 
//       maxAge: 3 * 24 * 60 * 60 * 1000, 
//       secure: true, 
//     });


//     res.status(200).json({ user: user._id, created: true });

//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // item Listing EndPoint 
// app.post("/ListofItems", async (req,res)=>{
//   try{
//     const newItem = new ItemModel(req.body);
//     // save item to the database
//     const savedItem = await newItem.save();
//     res.status(201).json({ message: "item listed successfully", data: savedItem });

//     const newListItem = new ItemModel({
//       ItemName,
//     ItemDescription,
//     ItemType,
//     ItemPrice,
//     DropAddress,
//     Date,
//     Time,
//     FirstName,
//     SecondName,
//     PhoneNumber,
//     });
// // save to the database
//     await newListItem.save();
//     console.log(newListItem)
//   }catch(error){
//     console.log(error);
//     res.status(500).json({error:" internal server error"});
//   }
// })



// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server started on PORT ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./Models/UserModel"); 
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

// JSON Web Token Secret Key
const jwtSecret = "rentisha super secret key"; // Change this to a strong and secure secret key

// User Registration Endpoint
app.post("/SignUp", async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const newUser = new UserModel({
      name,
      email,
      phone,
      password,
      confirmPassword,
    });

    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Generate JWT token and set it as a cookie
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "3d", // Token expiration time
    });

    res.cookie("jwt", token, {
      httpOnly: true, // Only accessible by the server
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
      secure: true, // Set to true if using HTTPS
    });

    res.status(201).json({ user: newUser._id, created: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User (Sign-in) Endpoint
app.post("/SignIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token and set it as a cookie
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "3d", // Token expiration time
    });

    res.cookie("jwt", token, {
      httpOnly: true, // Only accessible by the server
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
      secure: true, // Set to true if using HTTPS
    });

    res.status(200).json({ user: user._id, created: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
