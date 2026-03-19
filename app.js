// app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');   // ← novo

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com MongoDB (agora assíncrona)
connectDB();

// Rotas
const authRoutes = require('./routes/authRoutes');
const prepostagemRoutes = require('./routes/prepostagemRoutes');
const simularFreteRoutes = require('./routes/simularFreteRoutes');

app.use('/auth', authRoutes);
app.use('/consulta', simularFreteRoutes);
app.use('/prepostagem', prepostagemRoutes);

// Rota de saúde
app.get('/', (req, res) => {
  res.json({ status: 'API Facility Envios rodando!', mongodb: mongoose.connection.readyState === 1 ? '✅ Conectado' : '⛔ Desconectado' });
});

module.exports = app;