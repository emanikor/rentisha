require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./Models/UserModel"); 
const jwt = require("jsonwebtoken");
const multer = require('multer');
const CategoryModel = require("./Models/CategoryModel");
const ItemModel = require("./ItemModel/ItemModel");
const cloudinary =require('cloudinary').v2;
const crypto = require('crypto');

const nodemailer = require("nodemailer");

// const adminRoutes = require('./Admin/AdminRoutes');
// const userRoutes = require('./userRoutes');
// const categoryRoutes = require('./categoryRoutes');
// admin 
// const AdminRoutes = require('./Admin/AdminRoute/AdminRoute');

// const adminRoutes = require("../AdminRoute");

// app.use('/admin', adminRoutes);

// app.use('/admin', AdminRoutes);

// Mount routes
// app.use('/Admin', adminRoutes);
// app.use('/users', userRoutes);
// app.use('/categories', categoryRoutes);
// q


cloudinary.config({ 
  cloud_name: 'drnc1dhoa', 
  api_key: '466624274562764', 
  api_secret: 'KLupuFnVP23hjdTbM5k6CB5Yhe0' 
});



async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}



// Increase the request timeout to 60 seconds (60000 milliseconds)
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// stattic files deal
// app.use('./components/images', express.static('images'));

// const categoryIdObjectId = mongoose.Types.ObjectId(categoryId);
// require('dotenv').config();

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
const jwtSecret = "rentisha 2023 key";

function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  
  if (!token) {
    console.log('No token found');
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(403).json({ error: "Invalid token" });
    }

    console.log('Token verified:', user);

    req.user = user;
    next();
  });
}

// configure multer // Store files in memory as buffers
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });





// fetch all items get 
app.get('/ListofItems' , async(req, res)=>{
    const query = req.query;
    const items = await ItemModel.find(query)
    return res.status(201).json(items) 
})



// viewpoint item 
// app.get('/ListofItem')


// fetching by id endpoint 

app.get('/ListofItems/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await ItemModel.findById(itemId).exec();
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// list end point (sending request )
app.post('/ListofItems', upload.single('ItemImage'), async (req, res) => {
  try {
    const {
      ItemName,
      ItemDescription,
      ItemType, 
      ItemPrice,
      DropAddress,
      Date,
      Time,
      FirstName,
      SecondName,
      PhoneNumber,
      TermsCondition,
    } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Convert the file to a data URI and upload to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    // Fetch the category ObjectId based on ItemType (category name)
    console.log("Searching for category:", ItemType);
    const category = await CategoryModel.findOne({ name: ItemType });


if (!category) {
  return res.status(400).json({ error: `Categoree '${ItemType}' not found` });
}


    // Use the Cloudinary URL for the uploaded image
    const newItem = new ItemModel({
      ItemImage: cldRes.secure_url, 
      ItemName,
      ItemDescription,
      ItemType:category._id,
      ItemPrice,
      DropAddress,
      Date,
      Time,
      FirstName,
      SecondName,
      PhoneNumber,
      TermsCondition,
      
    });

    // Save the item to MongoDB
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// API endpoint for updating an item
app.put('/api/items/:itemId', upload.single('ItemImage'), async (req, res) => {
  try {
    const { itemId } = req.params;
    const updatedItem = req.body;

    console.log('Updating item with ID:', itemId);

    // Update the item in the database using Mongoose
    const result = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });

    console.log('Updated item:', result);

    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// user registration 
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
      verificationToken: crypto.randomBytes(16).toString("hex"),
      isVerified: false,
    });

    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Send verification email
    sendVerificationEmail(newUser);

    // Generate JWT token and set it as a cookie
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "3d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(201).json({ user: newUser._id, created: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


function sendVerificationEmail(user) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://localhost:3000/verify/${user.verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      console.log(info)
      if (error) {
        console.error("Error sending verification email:", error);
        // Handle the error accordingly, e.g., log it or send a response to the client
      } else {
        console.log("Email sent:", info.response);
        // Optionally, you can send a success response to the client
      }
    });
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
    // Handle the error accordingly, e.g., log it or send a response to the client
  }
}

app.get('/verify/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Update user's verification status
    await User.findByIdAndUpdate(userId, { isVerified: true });

    res.send('Email verified successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User (Sign-in) Endpoint
app.post("/SignIn", async (req, res) => {

  try {

    console.log('Sign-in request received');


    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log('Email:', email);
       console.log('Password:', password);
      return res.status(401).json({ error: "Invalid credentials" });
    }
  console.log(user)
    const isPasswordValid =  bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(password)
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token and set it as a cookie
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "3d",
    });

    
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   maxAge: 3 * 24 * 60 * 60 * 1000,
    //   secure: true,
    // });

    res.status(200).json({ user: user._id, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});






// get category
app.get('/api/category', async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// get item by the category 
app.get('/ListofItemsByCategory/:category', async (req, res) => {
  try {
    const category = req.params.category;

    // Find the category document by name
    const categoryDoc = await CategoryModel.findOne({ name: category });

    if (!categoryDoc) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Fetch related items based on the category
    const relatedItems = await ItemModel.find({ ItemType: categoryDoc._id }).populate('ItemType', 'name');

    res.status(200).json(relatedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// ADMIN

// category delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await CategoryModel.deleteOne({ _id: id });
    if (data.deletedCount === 1) {
      res.status(200).json({ success: true, message: "Data deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// userdelete
app.delete("/userdelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await UserModel.deleteOne({ _id: id });
    if (data.deletedCount === 1) {
      res.status(200).json({ success: true, message: "Data deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// get category
app.get('/api/category', async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// admin server 

// users


// update 
// delete
//  get
// post

// post user admin 
app.post("/adminSignUp", async (req, res) => {
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
      expiresIn: "3d", 
    });

    res.cookie("jwt", token, {
      httpOnly: true, 
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true, 
    });

    res.status(201).json({ user: newUser._id, created: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//fetch users 
app.get("/users",async(req,res)=>{
  const data = await UserModel.find({})
  res.json({success : true , data : data})
})  


// userdelete
app.delete("/userdelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await UserModel.deleteOne({ _id: id });
    if (data.deletedCount === 1) {
      res.status(200).json({ success: true, message: "Data deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// update user
app.put("/userupdate",async(req,res)=>{
  console.log(req.body)
  const { _id,...rest} = req.body 

  console.log(rest)
  const data = await UserModel.updateOne({ _id : _id},rest)
  res.send({success : true, message : "data update successfully", data : data})
})


// admin category 

// update 
// delete
//  get
// post

// fetch category 
app.get("/api/admincategory",async(req,res)=>{
  const data = await CategoryModel.find({})
  res.json({success : true , data : data})
}) 

// UPDATE CATEGORY 
app.put("/update",async(req,res)=>{
  console.log(req.body)
  const { _id,...rest} = req.body 

  console.log(rest)
  const data = await CategoryModel.updateOne({ _id : _id},rest)
  res.send({success : true, message : "data update successfully", data : data})
})



// delete category 
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await CategoryModel.deleteOne({ _id: id });
    if (data.deletedCount === 1) {
      res.status(200).json({ success: true, message: "Data deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST a new category
app.post('/api/category', async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = new CategoryModel({ name, description });
    await category.save(category);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
