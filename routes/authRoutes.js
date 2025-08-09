const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddlware');


router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/protected', authenticateToken, (req, res) => {
    res.send(`Bem-vindo ${req.user.username}, esta é uma rota protegida!`);
});


module.exports = router;
