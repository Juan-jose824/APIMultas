const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // No se necesita más configurar opciones específicas
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
  }
};

module.exports = connectDB;
