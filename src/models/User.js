const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  num_cel: {
    type: String,
    required: true,
    unique: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contra: {
    type: String,
    required: true,
  },
  nombre_com: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
