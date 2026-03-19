const express = require('express');
const router = express.Router();
const simularFreteController = require('../controllers/simularFreteController');

router.post('/simularFrete', simularFreteController.simularFrete);

module.exports = router;
