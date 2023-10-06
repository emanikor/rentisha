
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const categorySchema = new mongoose.Schema({
        Title: String,
        
      });
      

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
