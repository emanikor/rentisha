
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

// const categoryIdObjectId = mongoose.Types.ObjectId(categoryId);


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


// // category endpoint
// app.get('/ListofItemsByCategory/:category', async (req, res) => {
//   const category = req.params.category; // Use req.params.category

//   try {
//     // Convert the category string to an ObjectId
//     const categoryIdObjectId = mongoose.Types.ObjectId(category);

//     // Query the database using the ObjectId and populate the 'ItemType' field with 'CategoryModel'
//     const products = await ItemModel.find({ ItemType }).populate('ItemType');
    
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// app.get('/items-by-category/:categoryId', async (req, res) => {
//   const categoryId = req.params.categoryId;
//   try {
//     console.log('Category ID:', categoryId); // Log the received categoryId for debugging
    
//     const items = await ItemModel.find({ ItemType }).populate('categoryId');
//     console.log('Items:', items); 
//     res.status(200).json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.get('/ListofItems', async (req, res) => {
//   const category = req.params.category;

//   try {
//     console.log('Category ID:', category); 
    
//     // Use .populate('ItemType') to populate the ItemType field
//     const items = await ItemModel.find({ ItemType: category }).populate('ItemType');
//     console.log('Items:', items);
     
//     res.status(200).json(items);
//   } catch (err) {
//     console.error('Error fetching items by category:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });





// fetch all items get 
app.get('/ListofItems' , async(req, res)=>{
    const query = req.query;
    const items = await ItemModel.find(query)
    return res.status(201).json(items) 
})


// fetching items by category 
// app.get('/ListofItemsByCategory/:category', async (req, res) => {
//   const categoryName = req.params.category;

//   try {
//     // Convert the category name to ObjectId
//     const categoryId = mongoose.Types.ObjectId(categoryName);

//     // Retrieve items by the provided category ObjectId
//     const items = await ItemModel.find({ ItemType: categoryId });

//     // If no items are found, respond with a 404 status and a message
//     if (items.length === 0) {
//       return res.status(404).json({ error: 'No items found for this category' });
//     }

//     // Respond with the found items as a JSON array
//     res.status(200).json(items);
//   } catch (error) {
//     console.error('Error fetching items by category:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });





// app.get('/ListofItems', async (req, res) => {

//   const category = req.query.category; // Get the category from the query parameters
//   console.log('Category ID:', category);
//   try {
//     // Define a filter based on the category (if provided)
//     // const filter = category ? { ItemType: category._id } : {};
//     // Use the filter to query items
//     const items = await ItemModel.find({ ItemType: category });
//     console.log('Items:', items); 
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
app.put('/api/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const updatedItem = req.body;

    console.log('Updating item with ID:', itemId); // Add this log statement

    const result = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });

    console.log('Updated item:', result); // Add this log statement

    res.json(result);
  } catch (error) {
    console.error('Error:', error); // Add this log statement
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

// get category
// app.get('/categories/:categoryId', async (req, res) => {
//   const categoryId = req.params.categoryId;

//   try {
//     const products = await ItemModel.find({ ItemType: categoryId });
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


app.get('/byCategory/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;

  // Log the incoming request and categoryId for debugging
  console.log(`Received GET request for items in category: ${categoryId}`);

  // Check if categoryId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    console.error(`Invalid category ID: ${categoryId}`);
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    // Convert the categoryId string to an ObjectId
    const categoryIdObjectId = mongoose.Types.ObjectId(categoryId);

    // Query the database using the ObjectId and populate the 'ItemType' field with 'CategoryModel'
    const products = await ItemModel.find({ ItemType: categoryIdObjectId }).populate('ItemType');

    // Log the successful response
    console.log(`Found ${products.length} products in category: ${categoryId}`);

    res.json(products);
  } catch (error) {
    // Log the error
    console.error('Error fetching items by category:', error);

    res.status(500).json({ message: 'Server Error' });
  }
});



// related products
// app.get('/ListofItemsByCategory/:category', async (req, res) => {
//   try {
//     const category = req.params.category;

//     // Fetch related items from the database based on the category
//     const relatedItems = await ItemModel.find({ ItemType: category }).populate('category : name');;

//     if (!relatedItems || relatedItems.length === 0) {
//       return res.status(404).json({ error: 'No related products found for this category' });
//     }

//     res.status(200).json(relatedItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });




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


app.get('/api/products', (req, res) => {
  const category = req.query.category;
  const filteredProducts = ItemModel.filter(product => product.category === category);
  res.json(filteredProducts);
});



app.get('/items-by-category/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    console.log('Category ID:', categoryId); // Log the received categoryId for debugging
    
    const items = await ItemModel.find({ CategoryModel }).populate('categoryId');
    // await CatalogModel.find({'category._id':new ObjectId("615e94cab42d2274f0481232")})
    console.log('Items:', items); 
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// app.get('/api/products', async (req, res) => {
//   const client = new MongoClient(mongoURI, { useNewUrlParser: true });

//   try {
//     await client.connect();
//     const database = client.db();
  

//     const category = req.query.category;

//     if (!category) {
//       return res.status(400).json({ error: 'Category is required.' });
//     }

//     const filteredProducts = await ItemModel.find({ category }).toArray();
//     res.json(filteredProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching products.' });
//   } finally {
//     client.close();
//   }
// });



// category end point

  app.get('/api/products', (req, res) => {
    res.json(ProductDetail);
  });

 

  
// Get a specific product by ID
// app.get('/api/products/:productId', (req, res) => {
//   const productIdParam = req.params.productId;
//   console.log('Requested Product ID from URL:', productIdParam);

//   const productId = parseInt(productIdParam);
//   console.log('Parsed Product ID:', productId);

//   const product = ProductDetail.find(item => item.id === productId);
//   console.log('Product Found:', product);

//   if (!product) {
//     return res.status(404).json({ error: 'Product not found' });
//   }

//   res.json(product);
// });
  




// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
