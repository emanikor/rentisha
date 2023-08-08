

const { SignUp, SignIn} = require("../Controllers/AuthControllers");
const { checkUser } = require("../MiddleWares/AuthMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/SignUp", SignUp);
router.post("/SignIn", SignIn);

module.exports = router;

// Assuming this is the AuthRoutes.js

// const { checkUser } = require("../MiddleWares/AuthMiddleware");
// const { SignIn, signUp } = require("../Controllers/UserControllers"); 

// const router = require("express").Router();

// router.get("/Profile", checkUser, SignIn, signUp);

// module.exports = router;
