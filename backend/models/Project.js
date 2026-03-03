const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, required: true },
    liveLink: { type: String },
    isFeatured: { type: Boolean, default: false },
    orderIndex: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
