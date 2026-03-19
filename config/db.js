// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(
      process.env.MONGO_PASSWORD
    )}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?${process.env.MONGO_OPTIONS}`;

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Atlas conectado com sucesso!');
    console.log(`   Database: ${process.env.MONGO_DB}`);
  } catch (error) {
    console.error('❌ Erro fatal ao conectar ao MongoDB:', error.message);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

module.exports = connectDB;