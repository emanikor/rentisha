

const { SignUp, SignIn} = require("../Controllers/AuthControllers");
const { checkUser } = require("../MiddleWares/AuthMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/SignUp", SignUp);
router.post("/SignIn", SignIn);

module.exports = router;

