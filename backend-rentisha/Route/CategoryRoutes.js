// categoryRoutes.js (example of category-related routes)
const express = require('express');
const router = express.Router();
const CategoryModel = require('./categoryModel');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add more category-related routes as needed

module.exports = router;
