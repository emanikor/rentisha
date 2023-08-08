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
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = this.password; // Hashing the confirm password as well
  }
  next();
});


// find user
// userSchema.statics.SignUp = async function  (email, password){
//   const user = await this.findOne({email});
//   if(user){
    
//     // compare password 
//     const auth = await bcrypt.compare(password, user.password);
//     if(auth){
//       return user;
//      }
//      throw Error("incorrect password")
//   }
//   throw Error("incorrect Email");
// }


// module.exports = mongoose.model("Users", userSchema);

userSchema.statics.SignUp = async function(email, password) {
  const user = await this.findOne({ email });
  
  if (user) {
    throw new Error("Email is already registered");
  }
  
  // If email is not registered, proceed to create a new user
  const newUser = new this({
    email,
    password,
  });

  const salt = await bcrypt.genSalt();
  newUser.password = await bcrypt.hash(newUser.password, salt);

  // Save the new user to the database
  await newUser.save();

  return newUser;
}

module.exports = mongoose.model("Users", userSchema);