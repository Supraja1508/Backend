const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { createCollection } = require('../controllers/collectionController');

// Protected route to create a collection
router.post('/', verifyToken, createCollection);

module.exports = router;
