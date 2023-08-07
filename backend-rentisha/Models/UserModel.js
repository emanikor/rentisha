const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: { 
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"],
  },

  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItemModel' }],
});


// saves the hash password
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// find user
userSchema.statics.SignUp = async function  (email, password){
  const user = await this.findOne({email});
  if(user){
    
    // compare password 
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
     }
     throw Error("incorrect password")
  }
  throw Error("incorrect Email");
}


module.exports = mongoose.model("Users", userSchema);

