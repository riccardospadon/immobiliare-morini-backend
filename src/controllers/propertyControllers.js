import Property from '../models/property.js';

// GET all properties
export const getProperties = async (req, res) => {
    try{

        const { city, type, category } = req.query;
        const filters ={}
        if(city){
            filters.city = city;
        }
        if(type){
            filters.type = type;
        }
        if(category){
            filters.category = category;
        }

        const properties = await Property.find(filters);
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

// GET property by ID
export const getPropertyById = async (req, res) => {
    try{
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Immobile non trovato' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE property
export const updateProperty = async (req, res) => {
    try{
        const property = await Property.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!property) {
            return res.status(404).json({ message: 'Immobile non trovato' });
        }
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE property
export const deleteProperty = async (req, res) => {
    try{
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Immobile non trovato' });
        }
        res.json({ message: 'Immobile eliminato con successo' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};