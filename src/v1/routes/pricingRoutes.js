const express = require('express');
const { calculatePrice } = require('../controllers/pricingController');
const { validateInput } = require('../middleware/inputValidation');

const router = express.Router();

router.post('/calculate-price', validateInput, calculatePrice);

module.exports = router;
