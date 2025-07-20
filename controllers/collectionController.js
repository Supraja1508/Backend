// controllers/collectionController.js
const Collection = require('../models/Collection');
const mongoose = require('mongoose');

// Helper: Convert string type to Mongoose type
const mapType = (typeString) => {
  switch (typeString) {
    case 'String': return String;
    case 'Number': return Number;
    case 'Boolean': return Boolean;
    case 'Date': return Date;
    case 'Array': return [String]; // Adjust type if needed
    case 'JSON': return Object;
    default: return String;
  }
};

// @route POST /collections
exports.createCollection = async (req, res) => {
  try {
    const { name, schema } = req.body;

    // Validate inputs
    if (!name || !schema || typeof schema !== 'object') {
      return res.status(400).json({ error: 'Name and valid schema required' });
    }

    // Convert schema into Mongoose types
    const convertedSchema = {};
    for (let key in schema) {
      convertedSchema[key] = mapType(schema[key]);
    }

    // Save to database
    const collection = new Collection({
      userId: req.user.userId,
      name,
      schema
    });

    await collection.save();

    // Register model
   // Optional: Register dynamic model only if it hasn't been registered
if (!mongoose.models[name]) {
  mongoose.model(name, new mongoose.Schema(convertedSchema));
}

   res.status(201).json({ message: 'Collection created', collection });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create collection', details: err.message });
  }
};
