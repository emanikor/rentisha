
const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    Title: String,
    Cat: String,
    Price: Number,
    Img: String, 
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
