const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createLead).get(protect, getLeads);
router.route('/:id').delete(protect, deleteLead);
router.route('/:id/status').put(protect, updateLeadStatus);

module.exports = router;
