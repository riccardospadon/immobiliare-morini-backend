import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Il titolo è obbligatorio"],
        trim: true,
        minLength: [5, "Il titolo deve essere almeno di 5 caratteri"],
        maxLength: [100, "Il titolo non può superare i 100 caratteri"]
    },

    description: {
        type: String,
        required: [true, "La descrizione è obbligatoria"],
        trim: true,
        minLength: [10, "La descrizione deve essere almeno di 10 caratteri"],
        maxLength: [20000, "La descrizione non può superare i 20000 caratteri"]
    },

    price: {
        type: Number,
        required: [true, "Il prezzo è obbligatorio"],
        min: [0, "Il prezzo non può essere negativo"]
    },

    type: {
        type: String,
        required: true,
        enum: {
            values: ['vendita', 'affitto'],
            message: "Il tipo deve essere 'vendita' o 'affitto'"
        },
        required: [true, "Il tipo è obbligatorio"]
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: ['appartamento', 'villa', 'casa indipendente', 'attico', 'rustico'],
            message: "Categoria non valda"
        },
        required: [true, "La categoria è obbligatoria"]
    },

    city: {
        type: String,
        required: [true, "La città è obbligatoria"],
        trim: true,
        minLength: [3, "La città deve essere almeno di 3 caratteri"],
        maxLength: [100, "La città non può superare i 100 caratteri"]
    },

    address: {
        type: String,
        required: [true, "L'indirizzo è obbligatorio"],
        trim: true,
        minLength: [5, "L'indirizzo deve essere almeno di 5 caratteri"],
        maxLength: [200, "L'indirizzo non può superare i 200 caratteri"]
    }, 

    rooms: {
        type: Number,
        min: [0, "Il numero di stanze non può essere negativo"]
    },

    bathrooms: {
        type: Number,
        min: [0, "Il numero di bagni non può essere negativo"]
    },

    sqm: {
        type: Number,
        min: [0, "I metri quadri non può essere negativa"]
    },

    images: {
        type: [String],
        default: []
    },

    coverImage:{
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: {
            values: ['disponibile', 'in trattativa', 'venduto', 'affittato'],
            message: 'Status non valido'
        },
        default: 'disponibile'
    }
}, 
{ timestamps: true }

);

const Property = mongoose.model('Property', propertySchema);

export default Property;

