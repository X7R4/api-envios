const express = require('express');
const router = express.Router();
const prepostagemController = require('../controllers/prepostagemController');

router.post('/etiqueta', prepostagemController.enviarPrepostagem);

module.exports = router;
