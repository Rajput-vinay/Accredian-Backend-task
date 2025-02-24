const express = require('express');
const { ReferralSubmit, getAllReferral } = require('../controller/refferal.controller');

const router = express.Router();

router.post('/referral', ReferralSubmit);
router.get('/get-all-list', getAllReferral)
module.exports = router; 
