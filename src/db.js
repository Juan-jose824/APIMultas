// src/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Detiene el proceso si hay un error en la conexión
  }
};

module.exports = connectDB;
