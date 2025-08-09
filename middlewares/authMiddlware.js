const jwt = require('jsonwebtoken');

// Defina a chave secreta diretamente no código
const JWT_SECRET = 'vanguardthreatseeker';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Recupera o token do cabeçalho 'Authorization'

  if (!token) {
    return res.status(403).send('Acesso negado');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Adiciona a informação do usuário decodificada ao objeto da requisição
    next(); // Chama a próxima função no ciclo da requisição
  } catch (err) {
    return res.status(400).send('Token inválido');
  }
};

module.exports = authenticateToken;