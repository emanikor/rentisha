
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./Models/UserModel"); 
const jwt = require("jsonwebtoken");
const CategoryModel = require("./Models/CategoryModel");
const ItemModel = require("./ItemModel/ItemModel");

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


// list end point (sending request )
app.post('/ListofItems',  async (req, res) => {
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
    } = req.body;

    const newItem = new ItemModel({
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
    });

    await newItem.save();

    res.status(201).json({ message: 'Item listed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(password)
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token and set it as a cookie
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "3d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(200).json({ user: user._id, signedIn: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// category creation endpoint
// app.post ("/Product", async (req, res)=>{
//   try{
//      const{name} =req.body;
//      const existingCategory =await CategoryModel.findOne({name});
//      if(existingCategory){
//       return res.status(409).json ({error:"category already exist"});
//      }

//      const newCategory = new CategoryModel ({name});

//      await newCategory.save ();


//      res.status(201).json({ category: newCategory._id, created: true });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

// // category retrieval endpoint
// app.get("/Product", async (req,res) =>{
//   try{
//     const categories =await CategoryModel.find();
//     res.status(200).json(categories);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

const ProductDetail = [

  {
      id:1,
      Title:"Hp laptop",
      Cat: 'Tablet',
      Price: '723',
      Img:  'images/category3.jpg'
  },
  {
      id:2,
      Title:"Hp laptop",
      Cat: 'Smart Watch',
      Price: '168',
      Img:  'images/category2.jpg'
  },
  {
      id:3,
      Title:"Hp laptop",
      Cat: 'Headphone',
      Price: '49',
      Img:  'images/category1.jpg'
  },
  {
      id:4,
      Title:"Hp laptop",
      Cat: 'Camera',
      Price: '1049',
      Img:  'images/category3.jpg'
  },
  {
      id:5,
      Title:"Hp laptop.",
      Cat: 'Powerbank',
      Price: '49',
      Img:  'images/category2.jpg'
  },
  {
      id:6,
      Title:"Hp laptop",
      Cat: 'Electronics',
      Price: '156',
      Img:  'images/category1.jpg'
  },
  {
      id:7,
      Title:"Hp laptop",
      Cat: 'Gaming',
      Price: '2098',
      Img:  'images/category3.jpg'
  },
  {
      id:8,
      Title:"Hp laptop",
      Cat: 'Electronics',
      Price: '386',
      Img:  'images/category2.jpg'
  },
  {
      id:9,
      Title:"Hp laptop",
      Cat: 'Tablet',
      Price: '693',
      Img:  'images/category1.jpg'
  },
  {
      id:10,
      Title:"Hp laptop",
      Cat: 'Gaming',
      Price: '5036',
      Img:  'images/category3.jpg'
  },
  {
      id:11,
      Title:"Hp laptop",
      Cat: 'Electronics',
      Price: '198',
      Img:  'images/category2.jpg'
  },
  {
      id:12,
      Title:"Hp laptop",
      Cat: 'Electronics',
      Price: '793',
      Img:  'images/category3.jpg'
  },
]


  app.get('/api/products', (req, res) => {
    res.json(ProductDetail);
  });

app.get('/api/products', (req, res) => {
  const productIdParam = req.params.productId;
  console.log('Requested Product ID from URL:', productIdParam);

  const productId = parseInt(productIdParam);
  console.log('Parsed Product ID:', productId);

  const product = ProductDetail.find(item => item.id === productId);
  console.log('Product Found:', product);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
