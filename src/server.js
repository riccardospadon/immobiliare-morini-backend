import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/properties', propertyRoutes);

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'API Immobiliare Morini funzionante 🚀' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});