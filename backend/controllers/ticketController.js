const Ticket = require('../models/Ticket');

// @desc    Get public tracking info by Ticket ID
// @route   GET /api/tickets/track/:ticketId
// @access  Public
const getTicketByTrackId = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ ticketId: req.params.ticketId }).select('-clientEmail -_id');

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a new ticket (Admin)
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Ticket ID must be unique' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all tickets (Admin)
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a ticket (Admin)
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a ticket (Admin)
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        await ticket.deleteOne();
        res.json({ message: 'Ticket removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTicketByTrackId, createTicket, getTickets, updateTicket, deleteTicket };
