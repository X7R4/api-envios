// server.js
require('dotenv').config();
const app = require('./app'); // ✅ importa o app.js que já cria e configura o Express

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escutando na porta ${PORT}`);
});
