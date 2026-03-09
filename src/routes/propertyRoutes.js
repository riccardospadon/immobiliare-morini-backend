import express from 'express';
import { getProperties, createProperty, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getProperties);
router.post('/', authMiddleware, createProperty);
router.get('/:id', getPropertyById);
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);

export default router;