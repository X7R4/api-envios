const express = require('express');
const router = express.Router();
const prepostagemController = require('../controllers/prepostagemController');
const prazoController = require('../controllers/prazoController');
router.post('/etiqueta', prepostagemController.enviarPrepostagem);
router.post('/prazo', prazoController.prazoControllerConsulta);
module.exports = router;
