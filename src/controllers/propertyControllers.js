import Property from '../models/property.js';
import cloudinary from '../config/cloudinary.js'
import streamifier from 'streamifier'

// GET all properties with filters, sorting and pagination
export const getProperties = async (req, res) => {
    try{

        const { city, type, category, sort, minPrice, maxPrice, page=1, limit=6 } = req.query;

        const filters ={
            status: { $in: ['disponibile', 'in trattativa']}
        }
        if(city){
            filters.city = city;
        }
        if(type){
            filters.type = type;
        }
        if(category){
            filters.category = category;
        }
        if(minPrice || maxPrice){
            filters.price = {};
            if(minPrice){
                filters.price.$gte = Number(minPrice); // greater than or equal to minPrice
            }
            if(maxPrice){
                filters.price.$lte = Number(maxPrice); // less than or equal to maxPrice
            }
        }

        let sortOption = {};
        if(sort === 'price_asc'){
            sortOption.price = 1;
        } else if(sort === 'price_desc'){
            sortOption.price = -1;
        } else if(sort === 'newest'){
            sortOption.createdAt = -1; 
        } else if (sort === 'oldest'){
            sortOption.createdAt = 1;
        }

        const currentPage = parseInt(page);
        const perPage = parseInt(limit);
        const skip = (currentPage - 1) * perPage;
        const total = await Property.countDocuments(filters);

        const properties = await Property.find(filters).sort(sortOption).skip(skip).limit(perPage);
        res.json({
            total,
            currentPage,
            totalPages: Math.ceil(total / perPage),
            properties
        });
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

// UPLOAD property images
export const uploadPropertyImages = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)

        if(!property){
            return res.status(404).json({ message: "Immobile non trovato" })
        }
        
        if(!req.files || req.files.length === 0){
            return res.status(400).json({ message: "Nessun file caricato" })
        }

        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "immobiliare-morini" },
                    (error, result) => {
                        if(error){
                            reject(error)
                        } else {
                            resolve(result)
                        }
                    }
                )
                streamifier.createReadStream(fileBuffer).pipe(stream)
            })
        }

        const uploadResult = []

        for (const file of req.files){
            const result = await uploadToCloudinary(file.buffer)
            uploadResult.push(result.secure_url)
        }

        property.images.push(...uploadResult)
        await property.save()

        res.status(200).json({
            message: "Immagini caricate correttamente",
            images: property.images
        })
    } catch (error){
        res.status(500).json({ message: error.message })
    }
}