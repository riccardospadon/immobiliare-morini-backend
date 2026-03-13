import express from 'express';
import { getProperties, createProperty, getPropertyById, updateProperty, deleteProperty, uploadPropertyImages, setCoverImage } from '../controllers/propertyControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router();


router.get('/', getProperties);
router.post('/', authMiddleware, createProperty);
router.get('/:id', getPropertyById);
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);
router.post('/:id/images', authMiddleware, upload.array("images", 15), uploadPropertyImages);
router.patch("/:id/cover-image", authMiddleware, setCoverImage)

export default router;