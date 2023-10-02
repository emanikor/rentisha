const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const itemSchema = new mongoose.Schema({
  ItemImage: {
    type: String,
    required: true,
  },
  ItemName: { 
    type: String,
    required: [true, "Item name is required"],
  },
  ItemDescription: {
    type: String,
    required: [true, "Item description is required"],
  },
  ItemType: {
    type: String,
    required: [true, "Item type is required"],
  },
  ItemPrice: {
    type: Number,
    required: [true, "Listing price is required"],
  },
  DropAddress: {
    type: String,
    required: [true, "Drop-off address is required"],
  },
  Date: {
    type: Date,
    required: [true, "Date is required"],
  },
  Time: {
    type: String,
    required: [true, "Time is required"],
  },
  FirstName: {
    type: String,
    required: [true, "First name is required"],
  },
  SecondName: {
    type: String,
    required: [true, "Second name is required"],
  },
  PhoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  TermsCondition: {
    type: String,
    required: [true, "Terms and conditions are required"],
  },
  
  // ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
});

const ItemModel = mongoose.model('ItemModel', itemSchema);


module.exports = ItemModel;