const User = require("../Models/AuthModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, "rentisha 2023 key");
      const user = await User.findById(decodedToken.id);

      if (user) {
        res.json({ status: true, user: user.email });
      } else {
        res.json({ status: false });
      }
    } catch (err) {
      res.json({ status: false });
    }
  } else {
    res.json({ status: false });
  }
};
