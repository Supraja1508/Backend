const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {
  createDocument,
  getDocuments,
  getSingleDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentController');

router.post('/:collectionId/documents', verifyToken, createDocument);
router.get('/:collectionId/documents', verifyToken, getDocuments);
router.get('/:collectionId/documents/:documentId', verifyToken, getSingleDocument);
router.put('/:collectionId/documents/:documentId', verifyToken, updateDocument);
router.delete('/:collectionId/documents/:documentId', verifyToken, deleteDocument);


module.exports = router;
