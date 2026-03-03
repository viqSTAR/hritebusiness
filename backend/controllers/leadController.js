const Lead = require('../models/Lead');

// @desc    Create a new lead (Public)
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    try {
        const { name, email, company, budget, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        const lead = await Lead.create({
            name, email, company, budget, message
        });

        // TODO: Trigger Email notification to admin

        res.status(201).json(lead);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all leads (Admin)
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update lead status (Admin)
// @route   PUT /api/leads/:id/status
// @access  Private
const updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        lead.status = status;
        const updatedLead = await lead.save();
        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a lead (Admin)
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        await lead.deleteOne();
        res.json({ message: 'Lead removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createLead, getLeads, updateLeadStatus, deleteLead };
