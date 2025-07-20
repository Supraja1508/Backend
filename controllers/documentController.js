const Collection = require('../models/Collection');
const mongoose = require('mongoose');

// Validate value types
function validateValueType(value, expectedType) {
  switch (expectedType) {
    case 'String': return typeof value === 'string';
    case 'Number': return typeof value === 'number';
    case 'Boolean': return typeof value === 'boolean';
    case 'Date': return !isNaN(Date.parse(value));
    case 'Array': return Array.isArray(value);
    case 'Mixed': return typeof value === 'object';
    default: return false;
  }
}

// GET all documents with filtering, pagination, sorting
exports.getDocuments = async (req, res) => {
  const { collectionId } = req.params;
  const { page = 1, limit = 10, sortBy = '_id', order = 'asc', ...filters } = req.query;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    if (!collection.userId.equals(req.user.userId)) return res.status(403).json({ error: 'Unauthorized' });

    const schemaDefinition = {};
    for (const key in collection.schema) {
      const type = collection.schema[key];
      schemaDefinition[key] = type === 'Mixed' ? mongoose.Schema.Types.Mixed : { type: mongoose.Schema.Types[type] };
    }

    const modelName = collection.name;
    const Model = mongoose.models[modelName] || mongoose.model(modelName, new mongoose.Schema(schemaDefinition));
    const sortOrder = order === 'desc' ? -1 : 1;

    const docs = await Model.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch documents', details: err.message });
  }
};

// POST create a document
exports.createDocument = async (req, res) => {
  const { collectionId } = req.params;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    if (!collection.userId.equals(req.user.userId)) return res.status(403).json({ error: 'Unauthorized' });

    const schemaDefinition = {};
    for (const key in collection.schema) {
      const type = collection.schema[key];
      schemaDefinition[key] = { type: mongoose.Schema.Types[type] || mongoose.Schema.Types.Mixed };

    }

    const modelName = collection.name;
    const Model = mongoose.models[modelName] || mongoose.model(modelName, new mongoose.Schema(schemaDefinition));
    const docData = req.body;

    for (let key in collection.schema) {
      const expectedType = collection.schema[key];
      const value = docData[key];
      if (value !== undefined && !validateValueType(value, expectedType)) {
        return res.status(400).json({ error: `Invalid type for field "${key}", expected ${expectedType}` });
      }
    }

    const newDoc = new Model(docData);
    const savedDoc = await newDoc.save();

    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create document', details: err.message });
  }
};

// GET single document
exports.getSingleDocument = async (req, res) => {
  const { collectionId, documentId } = req.params;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    if (!collection.userId.equals(req.user.userId)) return res.status(403).json({ error: 'Unauthorized' });

    const schemaDefinition = {};
    for (const key in collection.schema) {
      const type = collection.schema[key];
      schemaDefinition[key] = type === 'Mixed' ? mongoose.Schema.Types.Mixed : { type: mongoose.Schema.Types[type] };
    }

    const modelName = collection.name;
    const Model = mongoose.models[modelName] || mongoose.model(modelName, new mongoose.Schema(schemaDefinition));

    const doc = await Model.findById(documentId);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get document', details: err.message });
  }
};

// PUT update a document
exports.updateDocument = async (req, res) => {
  const { collectionId, documentId } = req.params;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    if (!collection.userId.equals(req.user.userId)) return res.status(403).json({ error: 'Unauthorized' });

    const schemaDefinition = {};
    for (const key in collection.schema) {
      const type = collection.schema[key];
      schemaDefinition[key] = type === 'Mixed' ? mongoose.Schema.Types.Mixed : { type: mongoose.Schema.Types[type] };
    }

    const modelName = collection.name;
    const Model = mongoose.models[modelName] || mongoose.model(modelName, new mongoose.Schema(schemaDefinition));

    const updated = await Model.findByIdAndUpdate(documentId, req.body, { new: true });

    if (!updated) return res.status(404).json({ error: 'Document not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update document', details: err.message });
  }
};

// DELETE a document
exports.deleteDocument = async (req, res) => {
  const { collectionId, documentId } = req.params;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    if (!collection.userId.equals(req.user.userId)) return res.status(403).json({ error: 'Unauthorized' });

    const schemaDefinition = {};
    for (const key in collection.schema) {
      const type = collection.schema[key];
      schemaDefinition[key] = type === 'Mixed' ? mongoose.Schema.Types.Mixed : { type: mongoose.Schema.Types[type] };
    }

    const modelName = collection.name;
    const Model = mongoose.models[modelName] || mongoose.model(modelName, new mongoose.Schema(schemaDefinition));

    const deleted = await Model.findByIdAndDelete(documentId);

    if (!deleted) return res.status(404).json({ error: 'Document not found' });
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete document', details: err.message });
  }
};
