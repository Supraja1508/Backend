const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.userId}! This is your protected profile.` });
});

module.exports = router;
