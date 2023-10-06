
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
// import {v2 as cloudinary} from 'cloudinary';
          
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


// category endpoint
// app.get('/api/categories', async (req, res) => {
//   try {
//     const categories = await CategoryModel.find();
//     res.json(categories);
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });






// fetch all items get 
// app.get('/ListofItems' , async(req, res)=>{
//     const query = req.query
//     const items = await ItemModel.find(query)
//     return res.status(201).json(items) 
// })



app.get('/ListofItems', async (req, res) => {
  const category = req.query.category; // Get the category from the query parameters
  
  try {
    // Define a filter based on the category (if provided)
    const filter = category ? { ItemType: category._id } : {};
    // Use the filter to query items
    const items = await ItemModel.find(filter);
    
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// app.get('/items-by-category/:categoryId', async (req, res) => {
//   const categoryId = req.params.categoryId;
//   try {
//     const items = await ItemModel.find({ categoryId }).populate('categoryId');
//     res.status(200).json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get('/ListofItems', async (req, res) => {
//   const category = req.params.category;
//   console.log(category);
//   try {
    
//     const items = await ItemModel.find({ ItemType: category });
//     console.log(items);
//     res.status(200).json(items);
//   } catch (error) {
//     console.error('Error fetching items by category:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// app.get('/ListofItems', async (req, res) => {
//   const itemType = req.query.ItemType; // Get the 'ItemType' query parameter

//   // Create a query object to filter by ItemType if it's provided
//   const query = itemType ? { ItemType: itemType } : {};

//   try {
//     const items = await ItemModel.find(query);
//     return res.status(200).json(items);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });




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





// const ItemModel2 = mongoose.model('Item', itemSchema);


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
const category = await CategoryModel.findOne({ Title: ItemType });


if (!category) {
  return res.status(400).json({ error: `Category '${ItemType}' not found` });
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
app.put('/api/items/:id', async (req, res) => {
  console.log('PUT request received.');
  const itemId = req.params.id;
  const updatedItemData = req.body;

  console.log('PUT Request Received for Item ID:', itemId);
  
  try {
    // Find the item by ID and update it with the new data
    const updatedItem = await Item.findByIdAndUpdate(itemId, updatedItemData, { new: true });

    if (!updatedItem) {
      console.log('Item not found.');
      return res.status(404).json({ error: 'Item not found' });
    }

    console.log('Item Updated:', updatedItem);

    res.json(updatedItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
      id: 15,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    {
      id: 16,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    {
      id: 17,
      Title: 'Related Product 2',
      Img: 'images/related2.jpg',
    },
    {
      id: 18,
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
      id: 23,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 24,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 25,
      Title: 'Related Product 4',
      Img: 'images/related4.jpg',
    },
    {
      id: 26,
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

// post category
app.post("/api/save-product", async (req, res) => {
  try {
    // Retrieve the item details and selected category from the request body
    const {ItemName,  ItemDescription, ItemImage, ItemPrice } = req.body;

    // Create a new product document using the ProductModel
    const newProduct = new CategoryModel({
      ItemName,
        ItemDescription,
        ItemPrice,
        ItemImage,
    });
    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product data
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get('/items-by-category/:categoryId', async (req, res) => {
//   const categoryId = req.params.categoryId;
//   try {
//     const items = await ItemModel.find({ Id }).populate('categoryId');
//     res.status(200).json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// related products
app.get('/api/related-products/:category', async (req, res) => {
  try {
    const { category } = req.params;

    // Fetch related items from the database based on the category
    const relatedItems = await ItemModel.find({ ItemType: category._id });

    if (!relatedItems || relatedItems.length === 0) {
      return res.status(404).json({ error: 'No related products found for this category' });
    }

    res.status(200).json(relatedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// app.get('/items-by-category/:categoryId', async (req, res) => {
//   const categoryId = req.params.categoryId;
//   try {
//     console.log('Category ID:', categoryId); // Log the received categoryId for debugging
    
//     const items = await ItemModel.find({ categoryId }).populate('categoryId');
//     console.log('Items:', items); 
//     res.status(200).json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// category end point

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
