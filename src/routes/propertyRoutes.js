import express from 'express';
import { getProperties, createProperty, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyControllers.js';

const router = express.Router();

router.get('/', getProperties);
router.post('/', createProperty);
router.get('/:id', getPropertyById);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;