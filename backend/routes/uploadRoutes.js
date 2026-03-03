const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Memory storage keeps the file as a Buffer in RAM instead of writing to disk
// This is required for Render deployments to avoid local disk space wipes.
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        if (!process.env.CLOUDINARY_API_KEY) {
            return res.status(500).json({ message: 'Cloudinary credentials are not configured in the backend (.env).' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // Use a Promise to pipe the buffer stream directly into Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'portfolio_projects' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        res.json({ imageUrl: uploadResponse.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
});

module.exports = router;
