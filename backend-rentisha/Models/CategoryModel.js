
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   name: String,
   description: String,
    
      });
      

const CategoryModel = mongoose.model("Categoreee", categorySchema);

module.exports = CategoryModel;


// models/Category.js
