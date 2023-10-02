
const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    Title: String,
    itemDescription: String,
    Price: Number,
    Img: String, 
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
