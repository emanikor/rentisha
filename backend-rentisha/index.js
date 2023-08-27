
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./Models/UserModel"); 
const jwt = require("jsonwebtoken");
const multer = require('multer');
const CategoryModel = require("./Models/CategoryModel");
const ItemModel = require("./ItemModel/ItemModel");


const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// stattic files deal
// app.use('./components/images', express.static('images'));


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

    const items = await ItemModel.find()
    return res.status(201).json(items) 
})


// fetching by id endpoint 
// Fetch an item by itemId
// app.get('/ListofItems/:itemId' , async(req, res)=>{

 
//   const params = req.params
//   const id = params.id;
//   console.log('Received itemId:', id);
//   const item = await ItemModel.findById(id).exec();
//   return res.status(200).json(item)
 
// });
app.get('/ListofItems/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
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






// const {id} = req.params
// await ItemModel.findById(id).exec()

// const params = req.params;
// const id = params.id;

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

   

    const newItem = new ItemModel({
      ItemImage:`http://localhost:4000/images/${req.file.filename}`,
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
      return res.status(401).jsaon({ error: "Invalid credentials" });
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



// product apis
const ProductDetail = [

  {
      id:1,
      Title:"film & photography",
      Img:  'images/category3.jpg'
  },
  {
      id:2,
      Title:"Hp laptop",
      Img:  'images/category2.jpg'
  },
  {
      id:3,
      Title:"Drone",
      Img:  'images/category1.jpg'
  },
  {
      id:4,
      Title:"music instrumental",

      Img:  'images/category3.jpg'
  },
  {
      id:5,
      Title:"lenses",
      Img:  'images/category2.jpg'
  },
  {
      id:6,
      Title:"Electronics",

      Img:  'images/category1.jpg'
  },
  {
      id:7,
      Title:"Vehicles",
      Img:  'images/category3.jpg'
  },
  {
      id:8,
      Title:"sound systems",
      Img:  'images/category2.jpg'
  },
  {
      id:9,
      Title:"Hp laptop",
      Img:  'images/category1.jpg'
  },
  {
      id:10,
      Title:"Gym equipment",
      Img:  'images/category3.jpg'
  },
  {
      id:11,
      Title:"phones samsung",
      Img:  'images/category2.jpg'
  },
  {
      id:12,
      Title:"Tvs",
      Img:  'images/category3.jpg'
  },
]
const RelatedProducts = {
  'film & photography': [
    {
      id: 13,
      Title: 'Related Product 1',
      Img: 'images/related1.jpg',
    },
    {
      id: 14,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    {
      id: 14,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    {
      id: 14,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    {
      id: 14,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    {
      id: 14,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    // ... other related products for 'film & photography' category
  ],
  'Hp laptop': [
    {
      id: 21,
      Title: 'Related Product 3',
      Img: 'images/related3.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    // ... other related products for 'Hp laptop' category
  ],
  'Drone': [
    {
      id: 21,
      Title: 'Related Product 3',
      Img: 'images/related3.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
  ],
  'music instrumental': [
    {
      id: 21,
      Title: 'Related Product 3',
      Img: 'images/related3.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
  ],

  'Hp laptop': [
    {
      id: 21,
      Title: 'Related Product 3',
      Img: 'images/related3.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 22,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
  ],
    'lenses': [
      {
        id: 21,
        Title: 'Related Product 3',
        Img: 'images/related3.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
    ],
    'Gym equipment': [
      {
        id: 21,
        Title: 'Related Product 3',
        Img: 'images/related3.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
      {
        id: 22,
        Title: 'Related Product 4',
        Img: 'images/related4.jpg',
      },
    ]
  // Define related products for other categories as well
  // ...
};


app.get('/api/related-products/:category', (req, res) => {
  const { category } = req.params;

  if (!RelatedProducts[category]) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(RelatedProducts[category]);

});





// cartegory end point

  app.get('/api/products', (req, res) => {
    res.json(ProductDetail);
  });

 

  
// Get a specific product by ID
app.get('/api/products/:productId', (req, res) => {
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
