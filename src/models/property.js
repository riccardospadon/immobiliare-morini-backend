import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['vendita', 'affitto']
    },
    category: {
        type: String,
        required: true,
        enum: ['appartamento', 'villa', 'casa indipendente', 'attico', 'rustico']
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    rooms: Number,
    bathrooms: Number,
    sqm: Number,
    images: [String]
}, 
{ timestamps: true }

);

const Property = mongoose.model('Property', propertySchema);

export default Property;