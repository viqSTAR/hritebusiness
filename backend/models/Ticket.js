const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    clientEmail: { type: String, required: true },
    projectName: { type: String, required: true },
    phase: { type: String, default: 'Phase 01: Discovery' },
    stage: { type: Number, default: 0 }, // 0=Discovery,1=Design,2=Development,3=Testing,4=Deployment
    startDate: { type: String, required: true },
    eta: { type: String, required: true },
    lead: { type: String, required: true },
    leadInitials: { type: String },
    lastUpdate: { type: String, required: true },
    paidAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    milestones: [
        {
            title: { type: String, required: true },
            date: { type: String, required: true },
            attachments: [
                {
                    name: String,
                    url: String,
                    type: { type: String, enum: ['image', 'file'] }
                }
            ]
        }
    ],
    updates: [
        {
            date: { type: String, required: true },
            title: { type: String, required: true },
            img: { type: String }
        }
    ],
    status: {
        type: String,
        enum: ['Active', 'Paused', 'Completed'],
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
