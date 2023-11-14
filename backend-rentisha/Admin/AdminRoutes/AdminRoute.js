// adminRoutes.js

const express = require('express');
const router = express.Router();

// Define middleware to protect the admin route
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).send('Access denied. You are not an admin.');
};

// Define your admin routes
router.get('/', isAdmin, (req, res) => {
  res.send('Admin Panel');
});

// Add more admin routes as needed

module.exports = router;

