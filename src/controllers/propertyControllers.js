import Property from '../models/Property.js';

// GET all properties
export const getProperties = async (req, res) => {
    try{
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE property
export const createProperty = async (req, res) => {
    try{
        const property = new Property(req.body);
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};