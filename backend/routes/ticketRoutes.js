const express = require('express');
const router = express.Router();
const { getTicketByTrackId, createTicket, getTickets, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTicket).get(protect, getTickets);
router.route('/track/:ticketId').get(getTicketByTrackId);
router.route('/:id').put(protect, updateTicket).delete(protect, deleteTicket);

module.exports = router;
