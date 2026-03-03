const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hrite API is running' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hriteweb')
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        // Only start listening if we aren't in a Vercel serverless environment
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
        }
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });

// IMPORTANT: Export the Express API for Vercel
module.exports = app;
