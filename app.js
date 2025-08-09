// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors()); // ✅ cors pode ser usado agora
app.use(express.json()); // habilita JSON no body das requisições
// Middlewares
app.use(express.json());
// MongoDB
mongoose.connect('mongodb+srv://envio-facil:@melhor-frete.vlfd5ne.mongodb.net/envio-facil?retryWrites=true&w=majority').then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
const authRoutes = require('./routes/authRoutes');
const prepostagemRoutes = require('./routes/prepostagemRoutes');

app.use('/auth', authRoutes);
app.use('/prepostagem', prepostagemRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

module.exports = app;
